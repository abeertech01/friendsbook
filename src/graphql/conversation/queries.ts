export const queries = `#graphql
  getConversations: [Conversation]
  getMessages(conversationId: String!): [Message]
`
