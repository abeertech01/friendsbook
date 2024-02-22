import prismadb from "../lib/prismadb"

export interface AddConversationPayload {
  name: string
  isGroup: boolean
  userIds: string[]
}

export interface GetMessagesPayload {
  conversationId: string
}

export interface AddMessagePayload {
  body: string
  conversationId: string
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
    const allParticipants = [...userIds, id]
    let existingConversation = undefined

    const conversations = await prismadb.conversation.findMany()
    if (conversations.length !== 0) {
      existingConversation = conversations.find(
        (conv) =>
          conv.userIds.length === allParticipants.length &&
          conv.userIds.every((cu) => allParticipants.includes(cu))
      )
    }

    if (!existingConversation) {
      return await prismadb.conversation.create({
        data: {
          name,
          isGroup,
          userIds: allParticipants,
        },
      })
    }

    return existingConversation
  }

  public static async getMessages(payload: GetMessagesPayload) {
    const { conversationId } = payload

    return await prismadb.message.findMany({
      where: {
        conversationId,
      },
    })
  }

  public static async addMessage(payload: AddMessagePayload, id: string) {
    const { body, conversationId } = payload

    return await prismadb.message.create({
      data: {
        body,
        conversationId,
        senderId: id,
      },
    })
  }
}

export default ConversationService
