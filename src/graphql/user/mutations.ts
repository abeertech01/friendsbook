export const mutations = `#graphql
  createUser(
    username: String!,
    firstName: String!,
    lastName: String,
    profileImageURL: String,
    email: String!,
    password: String!
  ): String
`
