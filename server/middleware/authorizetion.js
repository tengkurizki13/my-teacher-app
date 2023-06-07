const { Course } = require("../models");

const authorizetion = async (req, res, next) => {
  try {
    let course = await Course.findByPk(req.params.id);
    if (!course) throw { name: "notFound" };
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = authorizetion;
