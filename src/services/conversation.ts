import prismadb from "../lib/prismadb"

export interface AddConversationPayload {
  name: string
  isGroup: boolean
  userIds: string[]
}

class ConversationService {
  public static getConversations() {
    return prismadb.conversation.findMany()
  }

  public static async addConversation(
    payload: AddConversationPayload,
    id: string
  ) {
    const { name, isGroup, userIds } = payload

    return prismadb.conversation.create({
      data: {
        name,
        isGroup,
        userIds: [...userIds, id],
      },
    })
  }
}

export default ConversationService
