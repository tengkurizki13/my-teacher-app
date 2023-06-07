const { Customer, CustomerCourse, Course } = require("../models");
const { comparePassword } = require("../helpers/bcryptjs");
const { encodedJson } = require("../helpers/webToken");
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(process.env.CLIENT_GOOGLE_ID);

class CustomerController {
  static async register(req, res, next) {
    try {
      const { email, password } = req.body;
      let createCustomer = await Customer.create({
        email,
        password,
      });
      res.status(201).json([
        {
          massage: "success to register",
          data: createCustomer,
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
      let customer = await Customer.findOne({
        where: { email },
      });
      if (!customer) throw { name: "authentication" };
      let isValidPassword = comparePassword(password, customer.password);
      if (!isValidPassword) throw { name: "authentication" };
      let payload = {
        id: customer.id,
      };
      payload = encodedJson(payload);
      res.status(200).json([
        {
          massage: "success to login",
          access_token: payload,
          id: customer.id,
          role: customer.role,
        },
      ]);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async googleSignIn(req, res, next) {
    try {
      const ticket = await client.verifyIdToken({
        idToken: req.headers.google_token,
        audience: process.env.CLIENT_GOOGLE_ID, // Specify the CLIENT_ID of the app that accesses the backend
        // Or, if multiple clients access the backend:
        //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
      });
      const payload = ticket.getPayload();

      let customer = await Customer.findOne({
        where: { email: payload.email },
      });

      let email = payload.email;
      let password = "12345";

      if (!customer) {
        customer = await Customer.create({
          email,
          password,
        });
      }
      let data = {
        id: customer.id,
      };
      data = encodedJson(data);
      res.status(200).json([
        {
          massage: "success to login",
          access_token: data,
          id: customer.id,
          role: customer.role,
        },
      ]);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

module.exports = CustomerController;
