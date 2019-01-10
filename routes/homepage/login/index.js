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
    if(bcrypt.compareSync(req.body.password, team.password)) {
      console.log('you are loged in')
    }
  })
}