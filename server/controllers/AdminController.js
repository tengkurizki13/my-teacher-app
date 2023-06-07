const { Admin } = require("../models");
const { comparePassword } = require("../helpers/bcryptjs");
const { encodedJson } = require("../helpers/webToken");

class AdminController {
  static async register(req, res, next) {
    try {
      const { email, password } = req.body;
      let createAdmin = await Admin.create({
        email,
        password,
        role: "Admin",
      });
      res.status(201).json([
        {
          massage: "success to register",
          data: createAdmin,
        },
      ]);
    } catch (error) {
      next(error);
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      if (!email || !password) throw { name: "Bad Request" };
      let admin = await Admin.findOne({
        where: { email },
      });
      let isValidPassword = comparePassword(password, admin.password);
      if (!admin || !isValidPassword) throw { name: "authentication" };
      let payload = {
        id: admin.id,
      };
      payload = encodedJson(payload);
      res.status(200).json([
        {
          massage: "success to login",
          access_token: payload,
          id: admin.id,
          role: admin.role,
        },
      ]);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = AdminController;
