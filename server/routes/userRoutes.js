const express = require("express");
const AdminController = require("../controllers/AdminController");
const CustomerController = require("../controllers/CustomerController");
const router = express.Router();

router.post("/admin/register", AdminController.register);
router.post("/admin/login", AdminController.login);

router.post("/customer/register", CustomerController.register);
router.post("/customer/login", CustomerController.login);
router.post("/customer/google-sign-in", CustomerController.googleSignIn);

module.exports = router;
