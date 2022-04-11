//Import Package
const express = require("express")
const mongoose = require("mongoose")
const passport = require("passport")
const bodyParser = require("body-parser")
const morgan = require("morgan")
const path = require("path")
require("dotenv").config()
require("./controllers/authController") // Passport Strategy

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(morgan("dev"))
// Connection to Database

mongoose
  .connect(process.env.DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log(`Database connected successfully`))
  .catch((err) => console.log(err))

mongoose.Promise = global.Promise

// CORS Configuration
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*")
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  )
  if (req.methods === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT,POST,DELETE")
    return res.status(200).json({})
  }
  next()
})
//Sending static files requests to the client
app.use(express.static(path.join(__dirname, "client", "build")))

// // Routes Configuration
const indexRouter = require("./routes/index")
const authRouter = require("./routes/auth")
const protectedRouteUser = require("./routes/user")
const ProtectedRouteArticle = require("./routes/article")

// API Configuration
app.use("/", indexRouter)
app.use("/", authRouter)
app.use("/user", protectedRouteUser)
app.use("/post", ProtectedRouteArticle)

// Error Middleware
app.use((req, res, next) => {
  const err = new Error("Not found")
  err.status = 404
  if (err.name === "UnauthorizedError") {
    res.status(err.status)
  }
  next(err)
})

//ERROR HANDLER
app.use((err, req, res, next) => {
  res.status(err.status || 500)
  res.json({
    error: {
      message: err.message,
    },
  })
})

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"))
})
// start the server
app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`)
})
