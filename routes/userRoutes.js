const express = require("express");
const userControllers = require("../controllers/userControllers");

const router = express.Router();

router.get("/", userControllers.getUser );
router.post("/signup", userControllers.postSignup );

module.exports = router;