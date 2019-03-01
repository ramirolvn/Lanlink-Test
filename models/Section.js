const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SectionSchema = new Schema({
  sectionName: {
    type: String,
    required: true
  },
  adminName: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
});

module.exports = Section = mongoose.model("sections", SectionSchema);
