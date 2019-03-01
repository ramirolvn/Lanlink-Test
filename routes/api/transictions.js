const express = require("express");
const router = express.Router();


const validateRegisterInput = require("../../validation/registerTransiction");


const Transiction = require("../../models/Transiction");


router.post("/registerTransiction", (req, res) => {

  const { errors, isValid } = validateRegisterInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }
  const newTransiction = new Transiction({
    transictionDescription: req.body.transictionDescription,
    section: req.body.section,
    transictionPrice: req.body.transictionPrice,
    employeeName: req.body.employeeName,
    employeeId : req.body.employeeId 
  });
  newTransiction
        .save()
        .then(transiction => res.json(transiction))
        .catch(err => console.log(err));
});

router.get("/getAllTransictions", (req, res) => {
  Transiction.find({}, (err, transictions) => {
    if (!err){ 
        res.json(transictions);
    } else {throw err;}
  });
});

router.post("/getUserTransictions", (req, res) => {
  Transiction.find({section:req.body.section}, (err, transictions) => {
    if (!err){ 
        res.json(transictions);
    } else {throw err;}
  });
});




module.exports = router;
