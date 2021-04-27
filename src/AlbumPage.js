import React, { useState, useEffect } from 'react';
import Amplify, { Storage } from 'aws-amplify';
import awsExports from "./aws-exports";
import { v4 as uuid } from 'uuid';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

Amplify.configure(awsExports);

const AlbumPage = (props) => {

  const [images, setImages] = useState([]);

  useEffect(() => {
    fetchImages()
  })

  async function fetchImages() {
    let path = "assets/projectpic/" + props.project + "/";
    let s3images = await Storage.list(path);
    showOrHideCarousel(s3images.length);
    s3images = await Promise.all(s3images.map(async image => {
      const signedImage = await Storage.get(image.key);
      return {src: signedImage, id: image.key};
    }))
    setImages(s3images);
  }

  function showOrHideCarousel(num) {
    if (props.carousel) {
      styles.carousel = {display: 'inherit'};
      styles.list = {display: 'none'};
      console.log(num)
      if (num === 0) {
        document.getElementById(props.project + 'album').style.display = 'none';
      }
    } else {
      styles.carousel = {display: 'none'};
      styles.list = {display: 'inherit'};
    }
  }

  async function onChange(e) {
    try {
      if (!e.target.files[0]) return;
      for (let i = 0; i < e.target.files.length; i++) {
        const file = e.target.files[i];
        let path = "assets/projectpic/" + props.project + "/" + uuid();
        Storage.put(path, file, {
          contentType: 'image/png'
        })
          .then(() => {fetchImages()});
      }
    } catch (error) {
      console.error();
    }
  }

  async function deleteImage(e) {
    try {
      Storage.remove(e.target.id)
        .then(() => {
            fetchImages()
            alert("Delete success!")
        });
    } catch (error) {
      console.error();
    }
  }

  return (
    <div style={styles.flexright + styles.image} id={props.project + 'album'}>
      <div id={props.project + 'carousel'} style={styles.carousel}>
        <Carousel dynamicHeight={true}>
          { images.map(image => 
          <div>
            <img src={image.src} id={image.id} alt=""/>
            <a href={image.src} target="_blank" rel="noreferrer"><p className="legend">Click to Open</p></a>
          </div>        
          ) }
        </Carousel>
      </div>
      
      <section id={props.project + 'list'} style={styles.list}>
        <h4>Add more images:</h4>
        <input
          type="file"
          accept='image'
          onChange={onChange}
          multiple
          style={styles.input}
        />
        <div style={styles.album}>
        { images.map(image =>
            <div style={styles.imagebg}>
                <img src={image.src} style={styles.image} alt=""/>
                <button id={image.id} style={styles.deleteIcon} onClick={deleteImage}>Delete image</button>
            </div>
        )}
        </div>
      </section>      
    </div>
  )
}

const styles = {
  container: { width: 'auto', margin: '0 auto', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 20 },
  flexright: { minWidth: 400},
  student: {  marginBottom: 15 },
  input: { border: 'none', backgroundColor: '#ddd', marginBottom: 10, padding: 8, fontSize: 18 },
  image: {width: 400, paddingBottom: 10, paddingTop: 10 },
  album: {display: 'flex', flexDirection: 'column' },
  imagebg: { position: 'relative', textAlign: 'center', color: 'white' },
  deleteIcon: { backgroundColor: 'black', color: 'white', outline: 'none', fontSize: 16, padding: '4px 0px', position: 'absolute', top: 14, right: 4 }
}

export default AlbumPage;
