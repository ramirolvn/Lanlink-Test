const express = require("express");
const router = express.Router();


const validateRegisterInput = require("../../validation/registerSection");


const Section = require("../../models/Section");


router.post("/registerSection", (req, res) => {

  const { errors, isValid } = validateRegisterInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  Section.findOne({
    sectionName: {
      $regex: new RegExp(req.body.sectionName, "i")
    }
  }).then(section => {
    if (section) {
      return res.status(400).json({ sectionName: "Department already exists" });
    } else {
      const newSection = new Section({
        sectionName: req.body.sectionName,
        adminName: req.body.adminName
      });
      newSection
        .save()
        .then(section => res.json(section))
        .catch(err => console.log(err));
    }
  });
});

router.get("/getAllSections", (req, res) => {
  Section.find({}, (err, sections) => {
    if (!err) {
      res.json(sections);
    } else { throw err; }
  });
});


module.exports = router;
