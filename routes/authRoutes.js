const express = require("express");
const { register, login, googleLogin, getProfile } = require("../controllers/authController");
const { body } = require("express-validator");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post(
    "/register",
    [
        body("name", "Name is required").not().isEmpty(),
        body("email", "Please include a valid email").isEmail(),
        body("password", "Password must be at least 6 characters long").isLength({ min: 6 }),
    ],
    register
);

router.post(
    "/login",
    [
        body("email", "Please include a valid email").isEmail(),
        body("password", "Password is required").exists(),
    ],
    login
);

router.post("/google-login", googleLogin);

router.get("/profile", authMiddleware, getProfile);
module.exports = router;
