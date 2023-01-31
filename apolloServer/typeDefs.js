const typeDefs = `#graphql
    type Product {
        id: ID!
        name: String!
        description: String!
        price: Float!
        imageUrl: String!
        user: User!
    }

    type Token {
        token: String!
    }

    type User {
        id: ID!
        name: String!
        email: String!
        phone: String!
        role: String!
        products: [Product]
    }

    type Query {
        getAllProducts: [Product]
        getProduct(id: ID!): Product
        getUser(id: ID!): User
    }

    type Mutation {
        createProduct(name: String!, description: String!, price: Float!, imageUrl: String!): Product
        updateProduct(id: ID!, name: String!, description: String!, price: Float!, imageUrl: String!): Product
        deleteProduct(id: ID!): Product

        updateUser(id: ID!, name: String!, email: String!, phone: String!, password: String!, role: String!): User
        createUser(name: String!, email: String!, phone: String!, password: String!, role: String!): User
        deleteUser(id: ID!): User
        verifyUser(email: String!, password: String!): Token
    }
`

module.exports = typeDefs
