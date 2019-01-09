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
    mongoose.model("teams").findOne({ emailLeader: req.body.emailLeader }, (err, team) => {
      if (team) {
        bcrypt.compare(req.body.password, team.password, (err, isMatch) => {
          if (err) throw err;
          if (isMatch) {
            return res.redirect('/');
          }
          return res.redirect("/dang-nhap")
        })
      }
      return res.redirect("/dang-nhap")
    })
  })
}