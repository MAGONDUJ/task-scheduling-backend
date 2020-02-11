const chalk = require("chalk");
const Sequelize = require("sequelize");

const connect = new Sequelize(
  process.env.DB_DATABASE,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "postgres",
    operatorsAliases: false,

    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
);
if (process.env.DATABASE_URL) {
  connect = new Sequelize(process.env.DATABASE_URL, {
    dialect: "postgres",
    protocol: "postgres",
    dialectOptions: {
      ssl: true
    }
  });
}
// Test DB
connect
  .authenticate()
  .then(() => console.log(chalk.cyan("Database connected...")))
  .catch(err => console.log("Error: " + err));
connect
  .sync()
  .then(() =>
    console.log(chalk.blueBright("<---------All Models sync-------->"))
  )
  .catch(err => console.log("Error: " + err));

// load models
const personnelModel = require("./personnelModel");
//const tasksModel = require("./tasksModel");

module.exports = {
  connect,
  personnelModel
  //tasksModel
};
