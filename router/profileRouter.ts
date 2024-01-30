import { Router } from "express";
import {
  createProfile,
  deleteOne,
  getUserProfile,
  updateOne,
  viewAll,
  viewOne,
} from "../controller/profileController";



const router = Router();

router.route("/:userID/create-profile").post(createProfile);
router.route("/find-profiles").get(viewAll);
router.route("/:profileID/find-profile").get(viewOne);
router.route("/:profileID/delete-profile").delete(deleteOne);
router.route("/:profileID/update-profile").patch(updateOne);
router.route("/:userID/:profileID/view-user-profile").get(getUserProfile);

export default router;
