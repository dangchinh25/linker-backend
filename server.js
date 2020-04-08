const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
require("dotenv").config()

const app = express()
app.use(cors())
app.use(express.json())

const port = process.env.PORT || 5000

//connect mongo server
mongoose.connect(process.env.MONGO_URI, {
	useNewUrlParser: true,
	useCreateIndex: true,
	useUnifiedTopology: true,
})
const connection = mongoose.connection
connection.once("open", () => console.log("Mongo connected"))

app.listen(port, () => console.log(`Server is running on port ${port}`))
