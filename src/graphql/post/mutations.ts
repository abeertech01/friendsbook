export const mutations = `#graphql
  addPost(
    content: String!
  ): Post

  addComment(
    text: String!
    postId: String!
  ): Comment
`
