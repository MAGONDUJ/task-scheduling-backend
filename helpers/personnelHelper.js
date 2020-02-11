const bcrypt = require("bcryptjs");
const chalk = require("chalk");
const Personnel = require("../models/personnelModel");

hashPassword = async pass => {
  let salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(pass, salt);
};
registerPersonnel = async params => {
  let isSuccessful = false;
  params.password = await hashPassword(params.password);
  Personnel.create(params).then(results => {
    if (results) {
      isSuccessful = true;
    }
  });
  return isSuccessful;
};
checkIfRegistered = async params => {
  let registered = false;
  await Personnel.findAll({ limit: 1, where: { phone: params.phone } }).then(
    personnel => {
      if (personnel.length != 0) {
        registered = true;
      }
    }
  );
  return registered;
};

loginPersonnel = async params => {
  let isSuccessful = false;
  let message = "";
  let personnelData = {};
  await Personnel.findAll({ limit: 1, where: { phone: params.phone } }).then(
    async personnel => {
      //console.log(personnel);
      //Compare passwords here
      await bcrypt
        .compare(params.password, personnel[0].dataValues.password)
        .then(async isMatch => {
          if (isMatch) {
            isSuccessful = true;
            message = "You have successfully logged in.";
            personnelData = personnel[0].dataValues;
            console.log(
              chalk.green(
                "Personnel " + params.phone + " has successfully logged in"
              )
            );
          } else {
            message = "Please check your credentials and try again.";
            personnelData = personnel[0].dataValues;
          }
        });
    }
  );
  return {
    isSuccessful: isSuccessful,
    message: message,
    data: personnelData
  };
};

module.exports = {
  registerPersonnel,
  checkIfRegistered,
  loginPersonnel
};
