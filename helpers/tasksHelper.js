const chalk = require("chalk");
const Task = require("../models").Task;

newTask = async params => {
  let isSuccessful = false;
  Task.create(params).then(results => {
    if (results) {
      isSuccessful = true;
    }
  });
  return isSuccessful;
};

getTasks = async params => {
  let isSuccessful = false;
  let taskData = {};

  var offset = params.page * params.limit - params.limit;
  await Task.count({
    offset: offset,
    limit: params.limit,
    order: [[params.order, params.orderMethod]]
  }).then(count => {
    console.log("Count:", count);
    taskData.totalTasks = count;
  });

  taskData.page = params.page;
  taskData.perPage = params.limit;

  await Task.findAll({
    offset: offset,
    limit: params.limit,
    order: [[params.order, params.orderMethod]]
  }).then(async results => {
    if (results) {
      isSuccessful = true;
      taskArray = [];

      var c = 0;
      for (var k in results) {
        let task = {};
        task.task_id = results[c]["task_id"];
        task.customer_first_name = results[c]["customer_first_name"];
        task.personnel_first_name = results[c]["personnel_first_name"];
        task.personnel_other_name = results[c]["personnel_other_name"];
        task.customer_last_name = results[c]["customer_last_name"];
        task.customer_phone = results[c]["customer_phone"];
        task.agentId = results[c]["agentId"];
        task.assigned = results[c]["assigned"];
        task.in_progress = results[c]["in_progress"];
        task.completed = results[c]["completed"];
        task.deferred = results[c]["deferred"];
        task.status = results[c]["status"];
        task.location = results[c]["location"];
        task.gender = results[c]["gender"];
        task.age = results[c]["age"];
        task.access_code = results[c]["access_code"];
        task.splash_page = results[c]["splash_page"];
        task.mpesa = results[c]["mpesa"];
        task.autoplay = results[c]["autoplay"];
        task.comments = results[c]["comments"];
        task.registration = results[c]["registration"];
        taskArray.push(task);
        c++;
      }
      taskData.tasks = taskArray;
    }
  });
  return {
    isSuccessful: isSuccessful,
    tasksData: taskData
  };
};

module.exports = {
  newTask,
  getTasks
};
