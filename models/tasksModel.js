const Sequelize = require("sequelize");
const db = require("./index").connect;

const Task = db.define("task", {
  task_id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  customer_first_name: {
    type: Sequelize.STRING
  },
  personnel_first_name: {
    type: Sequelize.STRING
  },
  personnel_other_name: {
    type: Sequelize.STRING
  },
  customer_last_name: {
    type: Sequelize.STRING
  },
  customer_phone: {
    type: Sequelize.STRING
  },
  agentId: {
    type: Sequelize.STRING
  },
  assigned: {
    type: Sequelize.DATE
  },
  in_progress: {
    type: Sequelize.DATE
  },
  completed: {
    type: Sequelize.STRING
  },
  deferred: {
    type: Sequelize.DATE
  },
  status: {
    type: Sequelize.STRING
  },
  location: {
    type: Sequelize.STRING
  },
  gender: {
    type: Sequelize.STRING
  },
  age: {
    type: Sequelize.STRING
  },
  access_code: {
    type: Sequelize.STRING
  },
  splash_page: {
    type: Sequelize.STRING
  },
  mpesa: {
    type: Sequelize.STRING
  },
  autoplay: {
    type: Sequelize.STRING
  },
  comments: {
    type: Sequelize.STRING
  },
  registration: {
    type: Sequelize.STRING
  }
});

module.exports = Task;
