const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateRegisterInput(data) {
  let errors = {};

  data.sectionName = !isEmpty(data.sectionName) ? data.sectionName : "";

  if (Validator.isEmpty(data.sectionName)) {
    errors.sectionName = "Department name field is required";
  }else if(!Validator.isLength(data.sectionName, { max: 100 })){
    errors.sectionName = "Department name is too long";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
