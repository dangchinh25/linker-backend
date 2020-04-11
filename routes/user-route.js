const router = require("express").Router()
const userController = require("..//controllers/user-controllers")
const imageUpload = require("../middleware/image-upload")

router.post("/new", imageUpload.array("image", 6), userController.addUser)

module.exports = router
