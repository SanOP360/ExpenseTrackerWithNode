const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize("node-schema", "root", "Sanjay@123", {
  dialect: "mysql",
  host: "localhost",
});

const Expense = sequelize.define("Expense", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
  },
  price: {
    type: DataTypes.DECIMAL(10, 2), // Adjust data type as per your requirement
    allowNull: false,
  },
});

module.exports = Expense;
