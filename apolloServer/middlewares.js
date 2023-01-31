const jwt = require("jsonwebtoken")
const User = require("./models/user")

const checkAuthentication = async (req, res, next) => {
  const authorization = req.headers.authorization || ""
  const token = authorization.slice(7)
  const tokenNotRequired = [
    "verifyUser",
    "createUser",
    "getAllProducts",
    "getProduct",
  ]

  // if token required then verify
  if (!tokenNotRequired.includes(req.body.operationName)) {
    try {
      if (
        req.headers.origin &&
        req.headers.origin !== "http://localhost:4000"
      ) {
        const { id } = jwt.verify(token, process.env.JWT_SECRET_KEY)
        const user = {...await User.findById(id)}
        req.user=user._doc
      }
    } catch (error) {
      return res.status(401).send({
        error: "User is not authenticated",
      })
    }
  }
  next()
}

module.exports = { checkAuthentication }
