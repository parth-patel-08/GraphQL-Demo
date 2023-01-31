const { ApolloServer } = require("@apollo/server")
const { expressMiddleware } = require("@apollo/server/express4")
const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const dotenv = require("dotenv")

const resolvers = require("./resolvers")
const typeDefs = require("./typeDefs")
const { checkAuthentication } = require("./middlewares")

const app = express()
dotenv.config()

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.start().then(() => {
  app.use(
    cors(),
    bodyParser.json(),
    checkAuthentication,
    expressMiddleware(server, {
      context: async ({ req }) => {
        return {
          user: req.user,
        }
      },
    })
  )
})

mongoose.set("strictQuery", true)

mongoose
  .connect(
    "mongodb+srv://smit:hello%40hello@cluster0.jc97s5o.mongodb.net/shop?retryWrites=true&w=majority"
  )
  .then(() => {
    const port = 4000
    app.listen(port, () => {
      console.log(`🚀 Server ready at http://localhost:${port}/`)
    })
  })
