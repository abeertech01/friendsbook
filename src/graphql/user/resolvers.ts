import UserService, { CreateUserPayload } from "../../services/user"

const queries = {
  helloU: () => "This is my hello from user",
  getUsers: async (_: any, _2: any, context: any) => {
    if (context && context.success) {
      const allUsers = await UserService.getUsers()

      return allUsers
    }

    throw new Error("User is not authorized")
  },
  getUserToken: async (
    _: any,
    payload: { email: string; password: string }
  ) => {
    const token = await UserService.getUserToken({
      email: payload.email,
      password: payload.password,
    })

    // TODO: Error if token is not valid

    return token
  },

  getCurrentLoggedInUser: async (_: any, _2: any, context: any) => {
    if (context && context.user) {
      const id = context.user.id
      const user = await UserService.getUserById(id)

      return user
    }

    throw new Error("User is not authorized")
  },
}

const mutations = {
  createUser: async (_: any, payload: CreateUserPayload) => {
    const res = await UserService.createUser(payload)

    return res
  },
}

export const resolvers = { queries, mutations }
