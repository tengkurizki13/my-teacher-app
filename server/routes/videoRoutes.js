const express = require("express");
const CourseController = require("../controllers/CourseController");
const router = express.Router();
const multer = require("multer");
const authorizetionForAdmin = require("../middleware/authorizetionForAdmin");

let upload = multer({ dest: "upload" });

router.post(
  "/admin/upload",
  authorizetionForAdmin,
  upload.single("file"),
  CourseController.uploadVideo
);
router.get("/admin/video", authorizetionForAdmin, CourseController.getAllVideo);

module.exports = router;
