/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getProject = /* GraphQL */ `
  query GetProject($id: ID!) {
    getProject(id: $id) {
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
export const listProjects = /* GraphQL */ `
  query ListProjects(
    $filter: ModelProjectFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listProjects(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const getProjectMember = /* GraphQL */ `
  query GetProjectMember($id: ID!) {
    getProjectMember(id: $id) {
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
export const listProjectMembers = /* GraphQL */ `
  query ListProjectMembers(
    $filter: ModelProjectMemberFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listProjectMembers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
          owner
        }
        membership
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
export const getStudent = /* GraphQL */ `
  query GetStudent($id: ID!) {
    getStudent(id: $id) {
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
export const listStudents = /* GraphQL */ `
  query ListStudents(
    $filter: ModelStudentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listStudents(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
