var router = require('express').Router();
var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
module.exports = router => {
  //get dang nhap
  router.get('/dang-nhap', (req, res, next) => {
    return res.render('homepage/login');
  })
  //post dang nhap
  router.post("/dang-nhap", (req, res, next) => {
    mongoose.model("teams").findOne({ emailLeader: req.body.emailLeader }, (err, team => {
      console.log("ok")
      
    }))
  })
}