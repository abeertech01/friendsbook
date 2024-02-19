export const mutations = `#graphql
  addConversation(
    name: String,
    isGroup: Boolean,
    userIds: [String]!,
  ): Conversation

  addMessage(
    body: String!,
    conversationId: String!,
    senderId: String!
  ): Message
`
