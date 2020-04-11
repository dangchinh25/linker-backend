const router = require("express").Router()
const userController = require("..//controllers/user-controllers")
const imageUpload = require("../middleware/image-upload")
const validateToken = require("../middleware/validateToken")

router.post(
	"/onboarding",
	validateToken,
	imageUpload.array("image", 6),
	userController.onboarding
)

router.post("/new", userController.signUp)
router.post("/login", userController.login)

module.exports = router
