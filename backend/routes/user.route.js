import express from "express";
import { login, logout, register, updateProfile } from "../controllers/user.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { singleUpload } from "../middlewares/mutler.js"; // Corrected 'multer' spelling in the import

const router = express.Router();

// Route for user registration
router.route("/register").post(singleUpload, register);

// Route for user login
router.route("/login").post(login);

// Route for user logout
router.route("/logout").get(logout);

// Route for profile update
router.route("/profile/update").post(isAuthenticated, singleUpload, updateProfile);

export default router;
