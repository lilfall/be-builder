// models/product.js

const { DataTypes } = require("sequelize");
const sequelize = require("../sequelize");
const Store = require("./store");

const Product = sequelize.define("Product", {
  product_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  product_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  stock: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  extra_data: {
    type: DataTypes.JSON,
  },
});

Product.belongsTo(Store, { foreignKey: "store_id" });

module.exports = Product;
