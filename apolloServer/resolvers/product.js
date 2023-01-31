const Product = require("../models/product")
const User = require("../models/user")

const createProduct = async (
  parent,
  { name, description, price, imageUrl },
  context
) => {
  try {
    const product = new Product({
      name,
      description,
      price,
      imageUrl,
      user: context.user,
    })
    await product.save()

    const user = await User.findById(context.user._id)
    user.products = [...user.products, product]
    await user.save()

    return product
  } catch (error) {
    console.log(error)
    return new Error("Error while creating a product")
  }
}

const getAllProducts = async () => {
  try {
    const products = await Product.find()
    return products
  } catch (error) {
    console.log(error)
    return new Error("Error while fetching products")
  }
}

const getProduct = async (parent, { id }, context, info) => {
  try {
    const product = await Product.findOne({ _id: id })
    if (!product) {
      throw new Error("Error while fetching product")
    }
    return product
  } catch (error) {
    console.log(error)
    return new Error("Error while fetching product")
  }
}

const updateProduct = async (
  parent,
  { id, name, description, price, imageUrl },
  context
) => {
  try {
    const product = await Product.findByIdAndUpdate(
      id,
      { name, description, price, imageUrl, user: context.user },
      { new: true }
    )
    if (!product) {
      throw new Error("Error while updating product")
    }
    return product
  } catch (error) {
    return new Error(error.message)
  }
}

const deleteProduct = async (parent, { id }) => {
  try {
    const product = await Product.findByIdAndDelete(id)
    const user = await User.findById(product.user)
    user.products = user.products.filter(
      (product) => String(product) !== String(id)
    )
    await user.save()
    if (!product) {
      throw new Error("Error while deleting product")
    }
    return product
  } catch (error) {
    return new Error(error.message)
  }
}

module.exports = {
  getAllProducts,
  updateProduct,
  createProduct,
  deleteProduct,
  getProduct,
}
