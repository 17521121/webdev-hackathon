var router = require('express').Router();
var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

module.exports = router => {
  //get dang nhap
  router.get('/dang-nhap', (req, res, next) => {
    return res.render('homepage/login');
  })

  router.get('/dang-xuat', async (req, res, next) => {
    await res.clearCookie("team", {path:"/"});
    return res.redirect('/');
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
    return res.redirect('/');
  })

  router.get('/quan-li-doi', async (req, res, next) => {
    let teamLogin = await mongoose.model('teams').findById(req.signedCookies.team);
    let sponsors = await mongoose.model('sponsors').find();
    let teams = await mongoose.model('teams').find();
    return res.render('homepage/login/teamManage', { sponsors, teamLogin, teams });
  })

  router.post('/huy-dang-ki', async (req, res, next) => {
    let teamLogin = await mongoose.model('teams').findOneAndDelete({_id: req.signedCookies.team});
    await res.clearCookie("team", {path:"/"});
    return res.redirect('/');
  })
}