const express = require("express");
const router = express.Router();
const chalk = require("chalk");

const helpers = require("../helpers");
const validator = require("../validators");

router.post("/register", async (req, res) => {
  let personnel = {};
  personnel.phone = req.body.phone;
  personnel.password = req.body.password;

  const { errors, isValid } = await validator.personnelRegistrationValidator(
    personnel
  );
  if (!isValid) {
    return res.status(400).json({
      message: "Failed",
      details: errors
    });
  }

  //Check whether personnel is registered
  let isregistered = await helpers.registeredCheck(personnel);
  if (isregistered) {
    return res.status(400).json({
      message: "Failed",
      details: "Phone number already registered"
    });
  }

  let isSuccessful = helpers.newPersonnel(personnel);
  if (isSuccessful) {
    res.status(200).json({
      message: "Successful",
      details: "Your registration was successful. Proceed to login"
    });
  } else {
    res.status(400).json({
      message: "Failed",
      details: "Error registering user. Contact customer support."
    });
  }
});

router.post("/login", async (req, res) => {
  let personnel = {};
  personnel.password = req.body.password;
  personnel.phone = req.body.phone;
  const { errors, isValid } = await validator.personnelLoginValidator(
    personnel
  );
  if (!isValid) {
    return res.status(400).json({
      message: "Failed",
      details: errors
    });
  }
  //Check whether customer is registered
  let isRegistered = await helpers.registeredCheck(personnel);
  if (!isRegistered) {
    return res.status(400).json({
      message: "Failed",
      details: "Phone number not registered"
    });
  }

  //Proceed to login
  let { isSuccessful, message, data } = await helpers.login(personnel);
  //console.log(data);
  if (isSuccessful) {
    let token = await helpers.generateJwt({
      id: data.id,
      phone: data.phone
    });
    res
      .header("auth-token", token)
      .status(200)
      .json({
        reset_password: "0",
        accessToken: token,
        expires_in: "24h"
      });
  } else {
    return res.status(400).json({
      message: "Failed",
      details: message
    });
  }
});

module.exports = router;
