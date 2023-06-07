const express = require("express");
const router = express.Router();
const userRoutes = require("./userRoutes");
const courseRoutes = require("./courseRoutes");
const videoRoutes = require("./videoRoutes");
const courseCustomerRoute = require("./courseCustomerRoute");
const authentication = require("../middleware/authentication");

router.use(userRoutes);
router.use(courseRoutes);
router.use(authentication);
router.use(courseCustomerRoute);
router.use(videoRoutes);

const errorHandler = (error, req, res, next) => {
  let status = 500;
  let message = "Internal Server Error";
  switch (error.name) {
    case "SequelizeValidationError":
    case "SequelizeUniqueConstraintError":
      status = 400;
      message = error.errors[0].message;
      break;
    case "Bad Request":
      status = 400;
      message = "Email / Password is required";
      break;
    case "authentication":
      status = 401;
      message = "You Are Not Authentication";
      break;
    case "forbidden":
      status = 403;
      message = "forbidden";
      break;
    case "notFound":
      status = 404;
      message = "data is not found";
      break;
    case "MidtransError":
      status = 400;
      message = error.ApiResponse.error_messages[0];
      break;
    default:
      status = 500;
      message = "Internal Server Error";
      break;
  }
  res.status(status).json({ message });
};
router.use(errorHandler);

module.exports = router;
