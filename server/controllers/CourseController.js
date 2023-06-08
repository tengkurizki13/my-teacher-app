const { Course } = require("../models");
const ApiVideoClient = require("@api.video/nodejs-client");
const apivideoClient = new ApiVideoClient({
  apiKey: "vtvdhxabD5c1GHkh9dgRJMQlHO8s7cPkbVb7ygxP7P9",
});
const { Op } = require("sequelize");

class CourseController {
  static async uploadVideo(req, res, next) {
    // Grab the file from the request
    const file = req.file;
    const { title, Description } = req.query;
    try {
      // the video title and description
      const videoCreationPayload = {
        title,
        Description,
      };
      // create a video object first
      const video = await apivideoClient.videos.create(videoCreationPayload);
      // upload the video
      const uploadVideoRes = await apivideoClient.videos.upload(
        video.videoId,
        file.path
      );
      // Add the response to the frontend request
      let pushCourse = await Course.create({
        title: videoCreationPayload.title,
        description: videoCreationPayload.Description,
        thumbnail: "vi2y6fd0g1d0OQvuNCHNPdTz",
        videoId: uploadVideoRes.videoId,
        AdminId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      res.status(200).json({ message: "berhasil upload video" });
    } catch (error) {
      console.log(error);
      next(error);
    }

    if (!file) {
      const error = new Error("No File");
      error.httpStatusCode = 400;
      return next(error);
    }
  }

  static async getAllVideo(req, res, next) {
    try {
      // create a video object first
      const video = await apivideoClient.videos.list();
      // upload the video

      for (let i = 0; i < video.data.length; i++) {
        let videos = video.data[i];
        let pushCourse = await Course.create({
          title: videos.title,
          description: "ini video dari api video",
          thumbnail: videos.assets.thumbnail,
          videoId: videos.videoId,
          AdminId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      }

      res.json("berhasil get video");
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async getAllCourse(req, res, next) {
    try {
      const { search } = req.query;

      let option = {
        where: { title: { [Op.iLike]: `%${search}%` } },
      };
      let courses = await Course.findAll(option);
      res.status(200).json(courses);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = CourseController;
