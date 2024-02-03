import { ApolloServer } from "@apollo/server"
import { User } from "./user"
import { Post } from "./post"

async function createApolloGraphQLServer() {
  // Create a new Apollo GraphQL Server
  const gqlServer = new ApolloServer({
    typeDefs: `
      ${User.typeDefs}
      ${Post.typeDefs}
      type Query {
        ${User.queries}
        ${Post.queries}
      }
      type Mutation {
        ${User.mutations}
        ${Post.mutations}
      }
    `, // Schema
    resolvers: {
      Query: {
        ...User.resolvers.queries,
        ...Post.resolvers.queries,
      },
      Mutation: {
        ...User.resolvers.mutations,
        ...Post.resolvers.mutations,
      },
    },
  })

  // Start the gql server
  await gqlServer.start()

  return gqlServer
}

export default createApolloGraphQLServer
