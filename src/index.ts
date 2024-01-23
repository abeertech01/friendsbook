import express from "express"
import path from "path"
import { expressMiddleware } from "@apollo/server/express4"
// import cors from "cors"
import dotenv from "dotenv"
import createApolloGraphQLServer from "./graphql"
import UserService from "./services/user"
dotenv.config({
  path: path.join(__dirname, ".env"),
})

async function init() {
  const app = express()
  const PORT = process.env.PORT || 8000

  // app.use(
  //   cors({
  //     origin: "http://localhost:5173",
  //     methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  //     credentials: true,
  //     optionsSuccessStatus: 204,
  //   })
  // )
  app.use(express.json())

  app.get("/", (req, res) => {
    res.json({
      message: "Server is up and running",
    })
  })

  app.use(
    "/graphql",
    expressMiddleware(await createApolloGraphQLServer(), {
      context: async ({ req }) => {
        const token = req.headers["token"]

        try {
          const user = UserService.decodeJWTToken(token as string)

          return { success: true, user }
        } catch (error) {
          return {
            success: false,
          }
        }
      },
    })
  )

  app.listen(PORT, () =>
    console.log(`Server is running on http://localhost:${PORT}`)
  )
}

init()
