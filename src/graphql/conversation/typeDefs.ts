export const typeDefs = `#graphql
  type Conversation {
    id: ID!
    createdAt: Date!,
    lastMessageAt: Date!,
    name: String,
    isGroup: Boolean,
    messages: [Message],
    userIds: [String]!
  }

  type Message {
    id: ID!,
    createdAt: Date!,
    body: String!,
    conversationId: String!,
    conversation: Conversation,
    seen: [User],
    senderId: String!,
    sender: User
  }
`
