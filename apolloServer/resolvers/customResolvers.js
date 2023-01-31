const User = require("../models/user")
const Product = require("../models/product")

const getUserByProductResolver = async (userId) => {
  try {
    const user = await User.findOne({ _id: userId })
    return user
  } catch (error) {
    console.log(error)
  }
}

const getProductsByUserResolver = async (products) => {
  try {
    const productsArr = await Product.find({ _id: { $in: products } })
    return productsArr
  } catch (error) {
    console.log(error)
  }
}

module.exports = { getProductsByUserResolver, getUserByProductResolver }
