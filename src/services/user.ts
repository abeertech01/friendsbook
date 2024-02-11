import { createHmac, randomBytes } from "node:crypto"
import JWT from "jsonwebtoken"
import prismadb from "../lib/prismadb"

const JWT_SECRET: string = process.env.JWT_SECRET!

export interface CreateUserPayload {
  username: string
  firstName: string
  lastName?: string
  email: string
  password: string
}

export interface GetUserTokenPayload {
  email: string
  password: string
}

class UserService {
  private static generateHash(salt: string, password: string) {
    const hash = createHmac("sha256", salt).update(password).digest("hex")

    return hash
  }

  public static getUserById(id: string) {
    return prismadb.user.findUnique({
      where: { id },
    })
  }

  public static async createUser(payload: CreateUserPayload) {
    const { username, firstName, lastName, email, password } = payload
    const salt = randomBytes(35).toString("hex")
    const hashedPassword = UserService.generateHash(salt, password)

    const user = await prismadb.user.create({
      data: {
        username,
        firstName,
        lastName,
        email,
        password: hashedPassword,
        salt,
      },
    })

    // Generate the token
    const token = await JWT.sign(
      {
        id: user.id,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      },
      JWT_SECRET
    )

    return token
  }

  private static getUserByEmail(email: string) {
    return prismadb.user.findUnique({
      where: { email },
    })
  }

  public static async getUserToken(payload: GetUserTokenPayload) {
    const { email, password } = payload
    const user = await UserService.getUserByEmail(email)

    if (!user) throw new Error("User not found")

    const userSalt = user.salt
    const userHashedPassword = UserService.generateHash(userSalt, password)

    if (userHashedPassword !== user.password)
      throw new Error("Incorrect pasword")

    // Generate the token
    const token = JWT.sign(
      {
        id: user.id,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      },
      JWT_SECRET
    )
    return token
  }

  public static decodeJWTToken(token: string) {
    return JWT.verify(token, JWT_SECRET)
  }
}

export default UserService
