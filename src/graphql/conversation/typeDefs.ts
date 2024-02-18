export const typeDefs = `#graphql
  type Conversation {
    id: ID!
    name: string,
    createdAt: Date!,
    lastMessageAt: Date!,
    isGroup: boolean,
    messages: [Message!]!,
    users: [User!]!
  }

  type Message {
    id: ID!,
    createdAt: Date!,
    body: string!,
    conversationId: string!,
    conversation: [Conversation!]!,
    seen: [User!]!,
    senderId: string!,
    sender: User
  }
`
