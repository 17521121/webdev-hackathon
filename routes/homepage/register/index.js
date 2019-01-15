var router = require('express').Router();
var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

var nodemailer = require("nodemailer");
var ejs = require("ejs");
var fs = require('fs')
var transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.email',
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: 'webhackathon', // generated ethereal user
    pass: 'password' // generated ethereal password
  }
});

var sendMail = function (from, to, subject, team) {
  ejs.renderFile("views/homepage/emailTemplate/register.ejs", team , function (err, content) {
    if (err) {
        console.log(err);
    } else {
        var mailOptions = {
            from: from, 
            to: to, //baz@example.com', // list of receivers
            subject: subject, // Subject line
            html: content, // '<b>html here</b>'
        };
        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            return console.log(error);
          }
          console.log('Message sent: %s', info.response);
          // Preview only available when sending through an Ethereal account
          // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
          // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
        });
    }
  })
};

var { PLATFORMS } = require('../../../config/constants')

module.exports = router => {
  //get dang ki
  router.get('/dang-ki', async (req, res, next) => {
    let sponsors = await mongoose.model('sponsors').find();
    return res.render('homepage/register', { sponsors, teamLogin: '', PLATFORMS, data: 'data' });
  })
  //post dang ki
  router.post('/dang-ki', async (req, res, next) => {
    let sponsors = await mongoose.model('sponsors').find();
    let isExistMail = await mongoose.model('teams').findOne({emailLeader: req.body.emailLeader});
    let isExistName = await mongoose.model('teams').findOne({teamName: req.body.teamName});
    if(isExistMail) {
      return res.render('homepage/register', { sponsors, teamLogin: '', PLATFORMS, data: 'error', err: 'Email đã tồn tại' });
    }
    if(isExistName) {
      return res.render('homepage/register', { sponsors, teamLogin: '', PLATFORMS, data: 'error', err: 'Tên team đã tồn tại'  });
    }
    try {
      let team = {
        teamName: req.body.teamName,
        emailLeader: req.body.emailLeader,
        password: req.body.password,
        platform: req.body.platform
      }
      let members = [];
      for (let i = 0; i < 2; i++) {
        members.push({
          name: req.body.name[i],
          MSSV: req.body.MSSV[i],
          phone: req.body.phone[i],
          school: req.body.school[i]
        })
      }
      team.submissions = [{ path: '' }, { path: '' }];
      team.member = members;
      const saltRounds = 10;
      bcrypt.hash(team.password, saltRounds, async (err, hash) => {
        team.password = hash;
        await mongoose.model('teams').create(team);
      });
      let subject = "Đăng kí thành công"     //subject 
      await sendMail('"Web Hackathon" <webhackathon@gmail.com>', team.emailLeader, subject, team);
      return res.render('homepage/register', { sponsors, teamLogin: '', PLATFORMS, data: 'success' });
    }
    catch (err) {
      return res.render('homepage/register', { sponsors, teamLogin: '', PLATFORMS, data: 'error' });
    }
  })

}