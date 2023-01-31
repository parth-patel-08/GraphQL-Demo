const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const User = require("../models/user")
const _ = require("lodash")

const createUser = async (parent, { name, email, phone, password, role }) => {
  try {
    const hash = await bcrypt.hash(password, 14)
    const user = new User({ name, email, phone, password: hash, role })
    await user.save()
    return user
  } catch (error) {
    if (error.code === 11000) {
      const errorMessage = `${Object.keys(error.keyValue)[0]} already exist`
      return new Error(
        errorMessage.charAt(0).toUpperCase() + errorMessage.slice(1)
      )
    }
    return new Error("Error while creating a user")
  }
}

const verifyUser = async (parent, { email, password }) => {
  try {
    const user = await User.findOne({ email })
    if (!user) {
      throw new Error("Invalid username or password")
    }
    const isValidUser = await bcrypt.compare(password, user.password)
    if (!isValidUser) {
      throw new Error("Invalid username or password")
    }
    return {
      token: jwt.sign(
        _.pick(user, ["id", "name", "email", "phone", "role"]),
        process.env.JWT_SECRET_KEY
      ),
    }
  } catch (error) {
    return new Error(error.message)
  }
}

const getUser = async (parent, { id }) => {
  try {
    const user = await User.findById(id)
    return user
  } catch (error) {
    return new Error("User not found")
  }
}

const updateUser = async (
  parent,
  { id, name, email, phone, password, role }
) => {
  try {
    const user = await User.findByIdAndUpdate(
      id,
      { name, email, phone, password, role },
      { new: true }
    )
    if (!user) {
      throw new Error("Error while updating user")
    }
    return user
  } catch (error) {
    return new Error(error.message)
  }
}

const deleteUser = async (parent, { id }) => {
  try {
    const user = await User.findByIdAndDelete(id)
    if (!user) {
      throw new Error("Error while deleting user")
    }
    return user
  } catch (error) {
    return new Error(error.message)
  }
}

module.exports = { getUser, updateUser, createUser, deleteUser, verifyUser }
