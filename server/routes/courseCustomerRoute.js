const express = require("express");
const CustomerController = require("../controllers/CustomerController");
const router = express.Router();
const authorizetion = require("../middleware/authorizetion");

router.post(
  "/customer/course/:id",
  authorizetion,
  CustomerController.addCustomerCourse
);
router.get("/customer/courses", CustomerController.getAllCustomerCourse);
router.get(
  "/customer/courses/:id",
  CustomerController.getAllCustomerCourseDetail
);

router.post("/generate-midtrans-token", CustomerController.paymentGateway);

module.exports = router;
