import { Router } from "express";
import {
  registerUser,
  loginController,
  logoutUser,
  changePassword,
} from "../Controller/UserController.js";
import { verifiedUser } from "../Middleware/verifyMiddleware.js";
import { upload } from "../Middleware/Multer.js";
const router = Router();

router.route("/register").post(
  upload.single("avatar"),
  registerUser
);
router.route("/login").get(verifiedUser,loginController);
router.route("/logout").get(verifiedUser,logoutUser);
router.route("/change-password").get(verifiedUser,changePassword);

export default router;
