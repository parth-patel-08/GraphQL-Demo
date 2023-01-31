// email: riyigo2984@ukbob.com
// pass: hello@hello
// DB: mongodb+srv://smit:<password>@cluster0.jc97s5o.mongodb.net/?retryWrites=true&w=majority

const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");

// const schema = require("./schema/schema")
const { schema, root } = require("./schema")

const app = express();


dotenv.config();
app.use(cors());
app.use('/graphql', graphqlHTTP({
  schema,
  rootValue: root,
  graphiql: true,
}));

mongoose.set('strictQuery', true);

mongoose.connect("mongodb+srv://smit:hello%40hello@cluster0.jc97s5o.mongodb.net/shop?retryWrites=true&w=majority").then(() => {
  app.listen(4000, () => {
    console.log("Running a GraphQL API server at http://localhost:4000/graphql");
  });
}).catch(error => {
  console.log(error.message)
})