const { Schema, model } = require("mongoose")

const ProductSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    }
})

module.exports = model("Product", ProductSchema)