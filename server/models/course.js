"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Course extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Course.hasMany(models.CustomerCourse);
    }
  }
  Course.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Title is required",
          },
          notEmpty: {
            msg: "Title is required",
          },
        },
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Description is required",
          },
          notEmpty: {
            msg: "Description is required",
          },
        },
      },
      thumbnail: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Thumbnail is required",
          },
          notEmpty: {
            msg: "Thumbnail is required",
          },
        },
      },
      videoId: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "VideoId is required",
          },
          notEmpty: {
            msg: "VideoId is required",
          },
        },
      },
      AdminId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "AdminId is required",
          },
          notEmpty: {
            msg: "AdminId is required",
          },
        },
        references: {
          model: {
            tableName: "Admins",
          },
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "Course",
    }
  );
  return Course;
};
