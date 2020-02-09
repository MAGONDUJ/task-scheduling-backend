//Personnel route validations
const personnelValidators = require("./personnelValidation");
const personnelRegistrationValidator =
  personnelValidators.validateRegisterInput;
const personnelLoginValidator = personnelValidators.validateLoginInput;

module.exports = {
  personnelRegistrationValidator,
  personnelLoginValidator
};
