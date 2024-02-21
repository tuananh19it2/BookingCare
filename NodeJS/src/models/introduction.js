"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Introduction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Introduction.init(
    {
      name: DataTypes.STRING,
      descriptionHTML: DataTypes.TEXT,
      descriptionMarkdown: DataTypes.TEXT,
      description: DataTypes.TEXT("long"),
      image: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Introduction",
    }
  );
  return Introduction;
};
