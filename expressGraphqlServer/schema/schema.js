const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLSchema, GraphQLID } = require("graphql");
const _ = require("lodash");

const products = [
    { id: "1", name: "one", description: "desc one", price: 201 },
    { id: "2", name: "two", description: "desc two", price: 202 },
    { id: "3", name: "three", description: "desc three", price: 203 }
]

const users = [
    { id: "1", name: "rinkesh", email: "rinkesh@gmail.com" },
    { id: "2", name: "smit", email: "smit@gmail.com" }
]

const ProductType = new GraphQLObjectType({
    name: "Product",
    fields: {
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        price: { type: GraphQLInt }
    }
})

const UserType = new GraphQLObjectType({
    name: "User",
    fields: {
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
    }
})

const RootQuery = new GraphQLObjectType({
    name: "Queries",
    fields: {
        product: {
            type: ProductType,
            args: {
                id: { type: GraphQLID }
            },
            resolve(parent, args) {
                // code to get data from DB
                return _.find(products, { id: args.id })
            }
        },
        user: {
            type: UserType,
            args: {
                id: { type: GraphQLID }
            },
            resolve(parent, args) {
                // code to get data from DB
                return _.find(users, { id: args.id })
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery
})