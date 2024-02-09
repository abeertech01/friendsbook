export const typeDefs = `#graphql
  type Post {
    id: ID!
    content: String!
    authorId: String!
    author: User!
    createdAt: Date!
  }

  type Comment {
    id: ID!
    text: String!
    postId: String!
    commenterId: String!
  }
`
