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
  .then(() => {
    console.log(chalk.cyan("Database connected..."));
  })
  .catch(err => console.log("Error: " + err));

const personnelModel = require("./personnelModel");
const tasksModel = require("./tasksModel");

const Personnel = connect.define("personnels", personnelModel, {
  freezeTableName: true
});
Personnel.sync().then(function() {
  console.log(chalk.blueBright(">---------Personnels Model sync-------->"));
});

const Task = connect.define("tasks", tasksModel, {
  freezeTableName: true
});
Task.sync().then(function() {
  console.log(chalk.blueBright(">---------Tasks Model sync-------->"));
});

module.exports = {
  connect,
  Personnel,
  Task
};
