import express from "express";
import {
  changeUserPassword,
  deleteUser,
  registerUser,
  resetUserPassword,
  signInUser,
  verifyUser,
  viewAllUser,
  viewOneUser,
} from "../controller/authController";
import validate from "../utils/validate";
import {
  validAction,
  validActionPass,
  validActionReset,
  validActionSign,
} from "../utils/validation";

const router = express.Router();

router.route("/all").get(viewAllUser);
router.route("/:userID/one").get(viewOneUser);
router.route("/:token/verify").get(verifyUser);
router.route("/register").post(validate(validAction), registerUser);
router.route("/sign-in").post(validate(validActionSign), signInUser);
router.route("/:userID/delete").delete(deleteUser);
router
  .route("/reset-user-password")
  .patch(validate(validActionReset), resetUserPassword);
router
  .route("/:token/change-user-password")
  .post(validate(validActionPass), changeUserPassword);

export default router;