const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProduct
} = require("./product")
const {
  getUser,
  createUser,
  updateUser,
  deleteUser,
  verifyUser,
} = require("./user")

const {
  getProductsByUserResolver,
  getUserByProductResolver,
} = require("./customResolvers")

const resolvers = {
  Product: {
    user: (parent) => getUserByProductResolver(parent.user)
  },
  User: {
    products: (parent) => getProductsByUserResolver(parent.products)
  },
  Query: {
    getAllProducts,
    getProduct,

    getUser,
  },
  Mutation: {
    createProduct,
    updateProduct,
    deleteProduct,

    createUser,
    updateUser,
    deleteUser,
    verifyUser,
  },
}

module.exports = resolvers
