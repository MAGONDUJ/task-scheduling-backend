const express = require("express");
const router = express.Router();
const chalk = require("chalk");

const helpers = require("../helpers");

router.post("/add", helpers.verifyJwtToken, async (req, res) => {
  let task = {};
  task.customer_first_name = req.body.customer_first_name;
  task.personnel_first_name = req.body.personnel_first_name;
  task.personnel_other_name = req.body.personnel_other_name;
  task.customer_last_name = req.body.customer_last_name;
  task.customer_phone = req.body.customer_phone;
  task.agentId = req.body.agentId;
  task.assigned = req.body.assigned;
  task.in_progress = req.body.in_progress;
  task.completed = req.body.completed;
  task.deferred = req.body.deferred;
  task.status = req.body.status;
  task.location = req.body.location;
  task.gender = req.body.gender;
  task.age = req.body.age;
  task.access_code = req.body.access_code;
  task.splash_page = req.body.splash_page;
  task.mpesa = req.body.mpesa;
  task.autoplay = req.body.autoplay;
  task.comments = req.body.comments;
  task.registration = req.body.registration;

  let isSuccessful = helpers.newTask(task);
  if (isSuccessful) {
    res.status(200).json({
      message: "Successful",
      details: "Task added successfully."
    });
  } else {
    res.status(400).json({
      message: "Failed",
      details: "Error adding task. Contact customer support."
    });
  }
});

router.get("/assigned", helpers.verifyJwtToken, async (req, res) => {
  let params = {};
  params.page = req.query.page;
  params.limit = req.query.limit;
  params.order = req.query.order;
  params.orderMethod = req.query.orderMethod;
  console.log(chalk.yellow("========|Tasks Query|======"));
  console.log(params);
  console.log(chalk.yellow("======================="));
  let getTaskRes = await helpers.getTasks(params);
  if (getTaskRes.isSuccessful) {
    res.status(200).json(getTaskRes.tasksData);
  } else {
    res.status(400).json({
      message: "Failed",
      details: { message: "Error getting tasks" }
    });
  }
});

module.exports = router;

//"host": "task-scheduling-backend.herokuapp.com",
