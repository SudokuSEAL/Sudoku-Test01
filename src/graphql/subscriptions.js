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
        }
        nextToken
      }
      roles
      searchString
      createdAt
      updatedAt
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
        }
        nextToken
      }
      roles
      searchString
      createdAt
      updatedAt
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
        }
        nextToken
      }
      roles
      searchString
      createdAt
      updatedAt
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
      }
      membership
      createdAt
      updatedAt
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
      }
      membership
      createdAt
      updatedAt
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
      }
      membership
      createdAt
      updatedAt
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
        }
        nextToken
      }
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
        }
        nextToken
      }
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
        }
        nextToken
      }
    }
  }
`;
