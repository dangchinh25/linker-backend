const mongoose = require("mongoose")
const Schema = mongoose.Schema

const newUser = new Schema({
	name: { type: String, required: true },
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true, minlength: 6 },
	userData: {
		type: mongoose.Types.ObjectId,
		ref: "UserData",
	},
})

module.exports = mongoose.model("UserAuth", newUser)
