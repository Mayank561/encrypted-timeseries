const express = require("express");
const {registerUser, loginUser, getMe} = require("../controller/auth");

const router = express.Router();
const {protectRoute} = require("../middleware/auth");
router.route("/register").post(registerUser);

router.route("/login").post(loginUser);
router.route('/me').get(protectRoute,getMe);

module.exports = router;