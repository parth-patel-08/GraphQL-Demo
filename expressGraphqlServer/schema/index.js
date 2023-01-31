const { buildSchema } = require("graphql")

const { getProduct, getAllProducts, createProduct, updateProduct, deleteProduct } = require("../resolvers/product");
const { getUser, createUser, updateUser, deleteUser, verifyUser } = require("../resolvers/user");

const schema = buildSchema(`
    type Product {
        id: ID!
        name: String
        description: String
        price: Float
        imageUrl: String
    }

    type Token {
        token: String!
    }

    type User {
        id: ID!
        name: String
        email: String,
        phone: Int,
        role: String,
    }

    type Query {
        getProduct(id: ID!): Product
        getAllProducts: [Product]
        getUser(id: ID!): User
    }

    type Mutation {
        createProduct(name: String!, description: String!, price: Float!, imageUrl: String!): Product
        updateProduct(id: ID!, name: String!, description: String!, price: Float!, imageUrl: String!): Product
        deleteProduct(id: ID!): Product

        updateUser(id: ID!, name: String!, email: String!, phone: Int!, password: String!, role: String!): User
        createUser(name: String!, email: String!, phone: Int!, password: String!, role: String!): User
        deleteUser(id: ID!): User
        verifyUser(email: String!, password: String!): Token
    }
`)

const root = {
    getProduct,
    getAllProducts,
    createProduct,
    updateProduct,
    deleteProduct,

    getUser,
    createUser,
    updateUser,
    deleteUser,
    verifyUser
}

module.exports = { schema, root }