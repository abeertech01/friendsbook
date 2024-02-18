export const queries = `#graphql
  helloU: String
  getUsers: [User]
  getUserToken(email: String!, password: String!): String
  getCurrentLoggedInUser: User
`
