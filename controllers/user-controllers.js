const HttpError = require("../errors/http-error")
const UserData = require("../models/UserData")
const UserAuth = require("../models/UserAuth")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const mongoose = require("mongoose")
const fs = require("fs")

const onboarding = async (req, res, next) => {
	const { name, age, gender, desc } = req.body
	const files = req.files

	const newUserData = new UserData({
		name,
		age,
		gender,
		desc,
		images: files.map((file) => file.path),
		userOwner: req.user.newUser._id,
	})

	let user
	try {
		user = await UserAuth.findById(req.user.newUser._id)
	} catch (err) {
		return next(
			new HttpError(
				"Creating user info failed, please try again later",
				500
			)
		)
	}

	if (!user)
		return next(
			new HttpError("Could not find the user for the provided id", 404)
		)

	try {
		const sess = await mongoose.startSession()
		sess.startTransaction()
		await newUserData.save({ session: sess })
		user.userData = newUserData
		await user.save({ session: sess })
		await sess.commitTransaction()
	} catch (err) {
		console.log(err)
		return next(
			new HttpError(
				"Creating user failed, please try again later.",
				500
			)
		)
	}

	res.status(201).json(newUserData)
}

const signUp = async (req, res, next) => {
	const { name, email, password } = req.body

	let existingUSer
	try {
		existingUSer = await UserAuth.findOne({ email: email })
	} catch (err) {
		return next(
			new HttpError("Signing up failed, please try again later", 500)
		)
	}

	if (existingUSer) {
		return next(
			new HttpError(
				"User already existed, please try login instead",
				422
			)
		)
	}

	let hashedPassword
	try {
		hashedPassword = await bcrypt.hash(password, 12)
	} catch (err) {
		return next(
			new HttpError(
				"Could not create user, please try again later",
				500
			)
		)
	}

	const newUser = new UserAuth({
		name,
		email,
		password: hashedPassword,
	})

	try {
		await newUser.save()
	} catch (err) {
		return new HttpError(
			"Could not create user, please try again later",
			500
		)
	}

	let token
	try {
		token = jwt.sign(
			{ userId: newUser.id, email: newUser.email },
			process.env.ACCESS_TOKEN_SECRET,
			{
				expiresIn: "1h",
			}
		)
	} catch (err) {
		return next(
			new HttpError("Signing up failed, please try again later.", 500)
		)
	}

	res.status(201).json({
		userId: newUser.id,
		email: newUser.email,
		token: token,
	})
}

const login = async (req, res, next) => {}

exports.onboarding = onboarding
exports.signUp = signUp
exports.login = login
