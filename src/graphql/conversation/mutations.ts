export const mutations = `#graphql
  addConversation(
    name: String,
    isGroup: Boolean,
    userIds: String[],
  ): Conversation
`
