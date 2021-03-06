//personnel helper
const personnelHelper = require("./personnelHelper");
const newPersonnel = personnelHelper.registerPersonnel;
const registeredCheck = personnelHelper.checkIfRegistered;
const login = personnelHelper.loginPersonnel;

//Jwt Helper
const jwtHelper = require("./jwtHelper");
const generateJwt = jwtHelper.generateJwtToken;
const verifyJwtToken = jwtHelper.verifyToken;

//tasks helper
const tasksHelper = require("./tasksHelper");
newTask = tasksHelper.newTask;
getTasks = tasksHelper.getTasks;

module.exports = {
  newPersonnel,
  registeredCheck,
  login,
  generateJwt,
  verifyJwtToken,
  newTask,
  getTasks
};
