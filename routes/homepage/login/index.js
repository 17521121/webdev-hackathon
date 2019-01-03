var router = require('express').Router();
var mongoose = require('mongoose');
module.exports = router => {
  //get dang nhap
  router.get('/dang-nhap', (req, res, next) => {
    return res.render('homepage/login');
  })
  //post dang nhap
  router.post(
    "/dang-nhap",
    async (req, res, next) => {
      let findTeam = await mongoose.model("teams").findOne({ teamName: req.body.teamName, password: req.body.password })
      if (findTeam) {
        if (req.body.remember) {
          req.session.cookie.maxAge = new Date(
            Date.now() + 30 * 24 * 60 * 60 * 100000
          ); // Cookie expires after 30 days
        } else {
          req.session.cookie.expires = false; // Cookie expires at end of session
        }
        return res.redirect("/");
      }
      return res.redirect("/dang-nhap")
    })
}