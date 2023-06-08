const authorizetionForAdmin = async (req, res, next) => {
  try {
    if (req.customer.role !== "Admin") throw { name: "forbidden" };
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = authorizetionForAdmin;
