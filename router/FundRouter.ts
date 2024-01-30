import { Router } from "express";
import { createBeg, deleteOneBeg, giveOneBeg, likeBeg, searchCategory, updateOneBeg, viewBeg, viewOneBeg, viewOneBegPopulate } from "../controller/FundController";


const router = Router()

router.route("/:userID/create-beg").post(createBeg)
router.route("/view-beg").get(viewBeg)
router.route("/:abgeID/give-beg").post(giveOneBeg)
router.route("/:abegID/view-one-beg").get(viewOneBeg)
router.route("/:abegID/view-one-beg-pop").get(viewOneBegPopulate)
router.route("/:abegID/delete-one-beg").delete(deleteOneBeg)
router.route("/:abegID/update-one-beg").patch(updateOneBeg)
router.route("/search-category").get(searchCategory)
router.route("/:userID/:abegID/like-beg").patch(likeBeg)

export default router