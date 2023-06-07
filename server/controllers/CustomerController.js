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

  static async addCustomerCourse(req, res, next) {
    try {
      const { id } = req.params;
      let customerCourse = await CustomerCourse.create({
        CustomerId: req.customer.id,
        CourseId: id,
      });
      res.status(200).json([
        {
          massage: "success to create your course",
        },
      ]);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async getAllCustomerCourse(req, res, next) {
    try {
      let customerCourse = await CustomerCourse.findAll({
        include: { model: Course },
        where: { CustomerId: req.customer.id },
      });
      res.status(200).json(customerCourse);
    } catch (error) {
      next(error);
    }
  }

  static async getAllCustomerCourseDetail(req, res, next) {
    try {
      const { id } = req.params;
      console.log(req.customer.id);
      let customerCourse = await CustomerCourse.findOne({
        include: { model: Course },
        where: {
          [Op.and]: [{ CustomerId: req.customer.id }, { id }],
        },
      });

      if (!customerCourse) throw { name: "notFound" };
      res.status(200).json(customerCourse);
    } catch (error) {
      next(error);
    }
  }

  static async paymentGateway(req, res, next) {
    try {
      let findCustomer = await Customer.findByPk(req.customer.id);
      let snap = new midtransClient.Snap({
        // Set to true if you want Production Environment (accept real transaction).
        isProduction: false,
        serverKey: process.env.MIDTRANS_SERVER_KEY,
      });

      let parameter = {
        transaction_details: {
          order_id:
            "TRANSACTION_" + Math.floor(1000000 + Math.random() * 9000000), // harus unique
          gross_amount: 100000, // harga
        },
        credit_card: {
          secure: true,
        },
        customer_details: {
          // first_name: "budi",
          // last_name: "pratama",
          email: findCustomer.email,
          // phone: "08111222333",
        },
      };

      const midtransToken = await snap.createTransaction(parameter);
      res.status(200).json(midtransToken);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

module.exports = CustomerController;
