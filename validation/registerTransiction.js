const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateRegisterInput(data) {
  let errors = {};

  data.transictionDescription = !isEmpty(data.transictionDescription) ? data.transictionDescription : "";
  data.section = !isEmpty(data.section) ? data.section : "";
  data.transictionPrice = !isEmpty(data.transictionPrice) ? data.transictionPrice : "";

  if (Validator.isEmpty(data.transictionDescription)) {
    errors.transictionDescription = "Description field is required";
  }else if(!Validator.isLength(data.transictionDescription, { max: 500 })){
    errors.transictionDescription = "Description is too long";
  }

  if (Validator.isEmpty(data.section)) {
    errors.section = "Department field is required";
  }

  if (Validator.isEmpty(data.transictionPrice) || data.transictionPrice === "$ 0,00") {
    errors.transictionPrice = "Transiction price field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
