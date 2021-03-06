/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateProject = /* GraphQL */ `
  subscription OnCreateProject {
    onCreateProject {
      id
      name
      description
      pictureURLs
      commandCenterLink
      externalSiteLink
      slackChannelLinks
      keywords
      members {
        items {
          id
          projectId
          studentId
          membership
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
      roles
      searchString
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onUpdateProject = /* GraphQL */ `
  subscription OnUpdateProject {
    onUpdateProject {
      id
      name
      description
      pictureURLs
      commandCenterLink
      externalSiteLink
      slackChannelLinks
      keywords
      members {
        items {
          id
          projectId
          studentId
          membership
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
      roles
      searchString
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onDeleteProject = /* GraphQL */ `
  subscription OnDeleteProject {
    onDeleteProject {
      id
      name
      description
      pictureURLs
      commandCenterLink
      externalSiteLink
      slackChannelLinks
      keywords
      members {
        items {
          id
          projectId
          studentId
          membership
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
      roles
      searchString
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onCreateProjectMember = /* GraphQL */ `
  subscription OnCreateProjectMember {
    onCreateProjectMember {
      id
      projectId
      studentId
      project {
        id
        name
        description
        pictureURLs
        commandCenterLink
        externalSiteLink
        slackChannelLinks
        keywords
        members {
          nextToken
        }
        roles
        searchString
        createdAt
        updatedAt
        owner
      }
      student {
        id
        name
        nickname
        phonenumber
        email
        specialty
        major
        year
        position
        since {
          month
          day
          year
        }
        teamLeader
        photoURL
        description
        skills
        status
        searchString
        resumeLink
        linkedIn
        createdAt
        updatedAt
        projects {
          nextToken
        }
        owner
      }
      membership
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onUpdateProjectMember = /* GraphQL */ `
  subscription OnUpdateProjectMember {
    onUpdateProjectMember {
      id
      projectId
      studentId
      project {
        id
        name
        description
        pictureURLs
        commandCenterLink
        externalSiteLink
        slackChannelLinks
        keywords
        members {
          nextToken
        }
        roles
        searchString
        createdAt
        updatedAt
        owner
      }
      student {
        id
        name
        nickname
        phonenumber
        email
        specialty
        major
        year
        position
        since {
          month
          day
          year
        }
        teamLeader
        photoURL
        description
        skills
        status
        searchString
        resumeLink
        linkedIn
        createdAt
        updatedAt
        projects {
          nextToken
        }
        owner
      }
      membership
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onDeleteProjectMember = /* GraphQL */ `
  subscription OnDeleteProjectMember {
    onDeleteProjectMember {
      id
      projectId
      studentId
      project {
        id
        name
        description
        pictureURLs
        commandCenterLink
        externalSiteLink
        slackChannelLinks
        keywords
        members {
          nextToken
        }
        roles
        searchString
        createdAt
        updatedAt
        owner
      }
      student {
        id
        name
        nickname
        phonenumber
        email
        specialty
        major
        year
        position
        since {
          month
          day
          year
        }
        teamLeader
        photoURL
        description
        skills
        status
        searchString
        resumeLink
        linkedIn
        createdAt
        updatedAt
        projects {
          nextToken
        }
        owner
      }
      membership
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onCreateStudent = /* GraphQL */ `
  subscription OnCreateStudent {
    onCreateStudent {
      id
      name
      nickname
      phonenumber
      email
      specialty
      major
      year
      position
      since {
        month
        day
        year
      }
      teamLeader
      photoURL
      description
      skills
      status
      searchString
      resumeLink
      linkedIn
      createdAt
      updatedAt
      projects {
        items {
          id
          projectId
          studentId
          membership
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
      owner
    }
  }
`;
export const onUpdateStudent = /* GraphQL */ `
  subscription OnUpdateStudent {
    onUpdateStudent {
      id
      name
      nickname
      phonenumber
      email
      specialty
      major
      year
      position
      since {
        month
        day
        year
      }
      teamLeader
      photoURL
      description
      skills
      status
      searchString
      resumeLink
      linkedIn
      createdAt
      updatedAt
      projects {
        items {
          id
          projectId
          studentId
          membership
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
      owner
    }
  }
`;
export const onDeleteStudent = /* GraphQL */ `
  subscription OnDeleteStudent {
    onDeleteStudent {
      id
      name
      nickname
      phonenumber
      email
      specialty
      major
      year
      position
      since {
        month
        day
        year
      }
      teamLeader
      photoURL
      description
      skills
      status
      searchString
      resumeLink
      linkedIn
      createdAt
      updatedAt
      projects {
        items {
          id
          projectId
          studentId
          membership
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
      owner
    }
  }
`;
