import prismadb from "../lib/prismadb"

interface AddConversationPayload {
  name: string
  isGroup: boolean
  userIds: string[]
}

class ConversationService {
  public static addConversation(payload: AddConversationPayload) {
    const { name, isGroup, userIds } = payload

    prismadb.conversation.create({
      data: {
        name,
        isGroup,
        userIds,
      },
    })
  }
}

export default ConversationService
