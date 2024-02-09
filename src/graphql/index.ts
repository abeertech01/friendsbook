import { ApolloServer } from "@apollo/server"
import GraphQLJSON from "graphql-type-json"
import { User } from "./user"
import { Post } from "./post"
import { DateScalar } from "./dateScalar"

async function createApolloGraphQLServer() {
  // Create a new Apollo GraphQL Server
  const gqlServer = new ApolloServer({
    typeDefs: `
    scalar JSON
    scalar Date

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
      JSON: GraphQLJSON,
      Date: DateScalar,
    },
  })

  // Start the gql server
  await gqlServer.start()

  return gqlServer
}

export default createApolloGraphQLServer
