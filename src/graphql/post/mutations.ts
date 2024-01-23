export const mutations = `#graphql
  addPost(
    title: String!,
    content: String!
  ): Post

  addComment(
    text: String!
    postId: String!
  ): Comment
`
