const express = require("express");
const CourseController = require("../controllers/CourseController");
const router = express.Router();
const multer = require("multer");

let upload = multer({ dest: "upload" });

router.post(
  "/admin/upload",
  upload.single("file"),
  CourseController.uploadVideo
);
router.get("/admin/video", CourseController.getAllVideo);

module.exports = router;
