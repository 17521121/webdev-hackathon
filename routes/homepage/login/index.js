var router = require('express').Router();
var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
module.exports = router => {
  //get dang nhap
  router.get('/dang-nhap', (req, res, next) => {
    return res.render('homepage/login');
  })
  //post dang nhap
  router.post("/dang-nhap", async (req, res, next) => {
    let team = await mongoose.model("teams").findOne({ emailLeader: req.body.emailLeader });
    if(!team) {
      return res.render('homepage/login');
    }
    //check password
    if(!bcrypt.compareSync(req.body.password, team.password)) {
      return res.render('homepage/login');
    }

    res.cookie('team', team._id, {signed: true});
    return res.redirect('/submit/vong1');

  })
}