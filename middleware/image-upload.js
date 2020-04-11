const path = require("path")
const multer = require("multer")
const uuid = require("uuid/v4")

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, "./images")
	},
	filename: (req, file, cb) => {
		const newFilename = uuid() + `${path.extname(file.originalname)}`
		cb(null, newFilename)
	},
})

const upload = multer({ storage })

module.exports = upload
