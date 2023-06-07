"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class CustomerCourse extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      CustomerCourse.belongsTo(models.Customer);
      CustomerCourse.belongsTo(models.Course);
    }
  }
  CustomerCourse.init(
    {
      CustomerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "CustomerId is required",
          },
          notEmpty: {
            msg: "CustomerId is required",
          },
        },
        references: {
          model: {
            tableName: "Customers",
          },
          key: "id",
        },
      },
      CourseId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "CourseId is required",
          },
          notEmpty: {
            msg: "CourseId is required",
          },
        },
        references: {
          model: {
            tableName: "Courses",
          },
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "CustomerCourse",
    }
  );
  return CustomerCourse;
};
