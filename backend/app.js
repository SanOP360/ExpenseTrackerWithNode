const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { Sequelize } = require("sequelize");
const expenseRoutes = require("./routes/expense");

const app = express();
app.use(bodyParser.json());
app.use(cors());

const sequelize = new Sequelize("node-schema", "root", "Sanjay@123", {
  dialect: "mysql",
  host: "localhost",
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Database connection has been established successfully.");
  })
  .catch((error) => {
    console.error("Unable to connect to the database:", error);
  });

// Import and use expense routes
app.use("/expenses", expenseRoutes);

sequelize.sync();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
