import ConversationService, {
  AddConversationPayload,
} from "../../services/conversation"

const queries = {
  async getConversations(_: any, _2: any, context: any) {
    if (context && context.success) {
      const conversations = await ConversationService.getConversations()

      return conversations
    }

    throw new Error("User is not authorized")
  },
}

const mutations = {
  async addConversation(_: any, payload: AddConversationPayload, context: any) {
    if (context && context.success) {
      const id = context.user.id

      const conversation = await ConversationService.addConversation(
        payload,
        id
      )

      return conversation
    }

    throw new Error("User is not authorized")
  },
}

export const resolvers = { queries, mutations }
