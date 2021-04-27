/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createProject = /* GraphQL */ `
  mutation CreateProject(
    $input: CreateProjectInput!
    $condition: ModelProjectConditionInput
  ) {
    createProject(input: $input, condition: $condition) {
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
export const updateProject = /* GraphQL */ `
  mutation UpdateProject(
    $input: UpdateProjectInput!
    $condition: ModelProjectConditionInput
  ) {
    updateProject(input: $input, condition: $condition) {
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
export const deleteProject = /* GraphQL */ `
  mutation DeleteProject(
    $input: DeleteProjectInput!
    $condition: ModelProjectConditionInput
  ) {
    deleteProject(input: $input, condition: $condition) {
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
export const createProjectMember = /* GraphQL */ `
  mutation CreateProjectMember(
    $input: CreateProjectMemberInput!
    $condition: ModelProjectMemberConditionInput
  ) {
    createProjectMember(input: $input, condition: $condition) {
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
export const updateProjectMember = /* GraphQL */ `
  mutation UpdateProjectMember(
    $input: UpdateProjectMemberInput!
    $condition: ModelProjectMemberConditionInput
  ) {
    updateProjectMember(input: $input, condition: $condition) {
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
export const deleteProjectMember = /* GraphQL */ `
  mutation DeleteProjectMember(
    $input: DeleteProjectMemberInput!
    $condition: ModelProjectMemberConditionInput
  ) {
    deleteProjectMember(input: $input, condition: $condition) {
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
export const createStudent = /* GraphQL */ `
  mutation CreateStudent(
    $input: CreateStudentInput!
    $condition: ModelStudentConditionInput
  ) {
    createStudent(input: $input, condition: $condition) {
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
export const updateStudent = /* GraphQL */ `
  mutation UpdateStudent(
    $input: UpdateStudentInput!
    $condition: ModelStudentConditionInput
  ) {
    updateStudent(input: $input, condition: $condition) {
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
export const deleteStudent = /* GraphQL */ `
  mutation DeleteStudent(
    $input: DeleteStudentInput!
    $condition: ModelStudentConditionInput
  ) {
    deleteStudent(input: $input, condition: $condition) {
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
