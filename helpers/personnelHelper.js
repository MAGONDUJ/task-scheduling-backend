const bcrypt = require("bcryptjs");
const chalk = require("chalk");
const { pool } = require("../config");

hashPassword = async pass => {
  let salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(pass, salt);
};
registerPersonnel = async params => {
  let isSuccessful = false;
  params.password = await hashPassword(params.password);

  const query = {
    text: "INSERT INTO personnel (phone, password) VALUES ($1, $2)",
    values: [params.phone, params.password]
  };
  await pool
    .query(query)
    .then(res => {
      console.log(chalk.grey("====|Personnel Successfully registered|===="));
      isSuccessful = true;
    })
    .catch(e => {
      console.error(chalk.red(e.stack));
    });
  return isSuccessful;
};
checkIfRegistered = async params => {
  let registered = false;
  const query = {
    name: "fetch-personnel",
    text: "SELECT * FROM personnel WHERE phone = $1",
    values: [params.phone]
  };
  await pool
    .query(query)
    .then(res => {
      //console.log(chalk.grey(JSON.stringify(res.rowCount)));
      if (res.rowCount > 0) {
        registered = true;
      }
    })
    .catch(e => {
      //console.error(chalk.red(e.stack));
    });
  return registered;
};

loginPersonnel = async params => {
  let isSuccessful = false;
  let message = "";
  let personnelData = {};
  const query = {
    name: "fetch-login",
    text: "SELECT * FROM personnel WHERE phone = $1",
    values: [params.phone]
  };
  await pool
    .query(query)
    .then(async res => {
      console.log(chalk.grey(JSON.stringify(res.rows[0])));
      await bcrypt
        .compare(params.password, res.rows[0].password)
        .then(async isMatch => {
          if (isMatch) {
            isSuccessful = true;
            message = "You have successfully logged in.";
            personnelData = res.rows[0];
            console.log(
              chalk.cyan(
                "Personnel " + params.phone + " has successfully logged in"
              )
            );
          } else {
            message = "Please check your credentials and try again.";
            personnelData = res.rows[0];
          }
        });
    })
    .catch(e => {
      //console.error(chalk.red(e.stack));
      message = "An Error occured trying to login";
      personnelData = e.stack;
    });
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
