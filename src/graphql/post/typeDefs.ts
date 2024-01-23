export const typeDefs = `#graphql
  type Post {
    id: ID!
    title: String!
    content: String!
    authorId: String!
  }

  type Comment {
    id: ID!
    text: String!
    postId: String!
    commenterId: String!
  }
`
