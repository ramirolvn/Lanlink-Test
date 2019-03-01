const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TransictionSchema = new Schema({
  transictionDescription: {
    type: String,
    required: true
  },
  section: {
    type: String,
    required: true
  },
  transictionPrice: {
    type: String,
    required: true
  },
  employeeName: {
    type: String,
    required: true
  },
  employeeId: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
});

module.exports = Transiction = mongoose.model("transictions", TransictionSchema);
