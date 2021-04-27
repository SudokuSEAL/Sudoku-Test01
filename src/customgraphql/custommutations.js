export const deleteProjectMember = /* GraphQL */ `
  mutation DeleteProjectMember(
    $input: DeleteProjectMemberInput!
    $condition: ModelProjectMemberConditionInput
  ) {
    deleteProjectMember(input: $input, condition: $condition) {
      id
      projectId
      studentId
      createdAt
      updatedAt
    }
  }
`;