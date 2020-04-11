const HttpError = require("../errors/http-error")
const User = require("../models/User")

const addUser = async (req, res, next) => {
	const { name, age, gender, desc } = req.body
	const files = req.files

	const newUser = new User({
		name,
		age,
		gender,
		desc,
		images: files.map((file) => file.path),
	})

	console.log(files)

	try {
		await newUser.save()
	} catch (err) {
		console.log(err)
		return next(
			new HttpError(
				"Creating user failed, please try again later.",
				500
			)
		)
	}

	res.status(201).json(newUser)
}

exports.addUser = addUser
