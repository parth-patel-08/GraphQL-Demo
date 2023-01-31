const Product = require("../models/product")

const createProduct = async ({ name, description, price, imageUrl }) => {
    try {
        const product = new Product({ name, description, price, imageUrl })
        await product.save()
        return product
    } catch (error) {
        return new Error(error.message)
    }
}

const getProduct = async ({ id }) => {
    try {
        const product = await Product.findById(id)
        return product
    } catch (error) {
        return new Error(error.message)
    }
}

const getAllProducts = async () => {
    try {
        const products = await Product.find({})
        return products
    } catch (error) {
        return new Error(error.message)
    }
}

const updateProduct = async ({ id, name, description, price, imageUrl }) => {
    try {
        const product = await Product.findByIdAndUpdate(id, { name, description, price, imageUrl }, { new: true })
        if(!product) {
            throw new Error("Product Not Found")
        }
        return product
    } catch (error) {
        return new Error(error.message)
    }
}

const deleteProduct = async ({ id }) => {
    try {
        const product = await Product.findByIdAndDelete(id)
        if(!product) {
            throw new Error("Product Not Found")
        }
        return product
    } catch (error) {
        return new Error(error.message)
    }
}

module.exports = { getProduct, getAllProducts, updateProduct, createProduct, deleteProduct }