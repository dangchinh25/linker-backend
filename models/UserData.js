const mongoose = require("mongoose")
const Schema = mongoose.Schema

const userDataSchema = new Schema({
	userOwner: {
		type: mongoose.Types.ObjectId,
		required: true,
		ref: "UserAuth",
	},
	name: { type: String, required: true },
	age: { type: Number, required: true },
	gender: { type: String, required: true },
	desc: { type: String, required: true },
	images: [{ type: String, required: true }],
})

module.exports = mongoose.model("UserData", userDataSchema)
