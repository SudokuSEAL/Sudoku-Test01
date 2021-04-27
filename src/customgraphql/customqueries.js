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
      resumeLink
      linkedIn
      createdAt
      updatedAt
      projects {
        items {
          project {
            id
            name
          }     
          id
          projectId
          studentId
          membership
        }
        nextToken
      }
    }
  }
`;
export const getStudentForEdit = /* GraphQL */ `
  query getStudentForEdit($id: ID!) {
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
      resumeLink
      linkedIn
      updatedAt
    }
  }
`;
export const getProject = /* GraphQL */ `
  query GetProject($id: ID!) {
    getProject(id: $id) {
      id
      name
      description
      pictureURLs
      commandCenterLink
      keywords
      externalSiteLink
      slackChannelLinks
      members {
        items {
            student {
                id
                name
            }
          id
          projectId
          studentId
          membership
        }
        nextToken
      }
      roles
      createdAt
      updatedAt
    }
  }
`;
export const getProjectForEdit = /* GraphQL */ `
  query GetProject($id: ID!) {
    getProject(id: $id) {
      id
      name
      description
      pictureURLs
      commandCenterLink
      externalSiteLink
      slackChannelLinks
      roles
      keywords
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
        members {
          nextToken
        }
        roles
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
export const getProjectMemberForEdit = /* GraphQL */ `
  query GetProjectMember($id: ID!) {
    getProjectMember(id: $id) {
      id
      projectId
      studentId
      membership
    }
  }
`;
export const listStudentIdsNames = /* GraphQL */ `
  query ListStudents(
    $filter: ModelStudentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listStudents(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
      }
      nextToken
    }
  }
`;
export const listStudentsWithProjects = /* GraphQL */ `
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
        resumeLink
        linkedIn
        createdAt
        updatedAt
        projects {
          items {
            id
          }
          nextToken
        }
      }
      nextToken
    }
  }
`;

export const listProjectsWithStudents = /* GraphQL */ `
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
        members {
          items {
            id
          }
          nextToken
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;

export const listEnumValues = /* GraphQL */`
  query ListEnumValues($enum: String!) {
    enum: __type(name: $enum) {
      enumValues {
        name
      }
    }
  }
`;

export const searchStudents = /* GraphQL */`
query SearchStudents($input: String) {
  listStudents(filter: {searchString: {contains: $input}}) {
    items {
      id
      name
      nickname
      major
      email
      description
      photoURL
      skills
      searchString
      status
      resumeLink
      linkedIn
      createdAt
      updatedAt
      since {
        month
        day
        year
      }
      specialty
      year
      teamLeader
      skills
      projects {
        items {
          id
        }
        nextToken
      }
    }
  }
}
`;

export const searchStudentsMajor = /* GraphQL */`
query SearchStudentsMajor($input: String, $major: Major) {
  listStudents(filter: {searchString: {contains: $input}, and: {major: {eq: $major}}}) {
    items {
      id
      name
      nickname
      major
      email
      description
      photoURL
      skills
      searchString
      status
      resumeLink
      linkedIn
      createdAt
      updatedAt
      since {
        month
        day
        year
      }
      specialty
      year
      teamLeader
      skills
      projects {
        items {
          id
        }
        nextToken
      }
    }
  }
}
`;

export const searchProjects = /* GraphQL */`
query SearchProjects($input: String) {
  listProjects(filter: {searchString: {contains: $input}}) {
    items {
      id
      name
      externalSiteLink
      commandCenterLink
      description
      pictureURLs
      keywords
      slackChannelLinks
      members {
        items {
          id
        }
        nextToken
      }
      searchString
      createdAt
      updatedAt
    }
  }
}`;

export const listProjectKeyWords = /* GraphQL */`
query MyQuery {
  listProjects {
    items {
      keywords
    }
  }
}`;