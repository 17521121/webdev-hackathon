var mongoose = require('mongoose');
var { success, errorProcess } = require('../../../services/returnToUser');
var slugify = require('slugify');
var { checkPermission } = require('../../../services/checkPermission');
/*  socket module */
// var express = require('express');
// var app = express();
// var server = require('http').createServer(app);
// var socket = require('socket.io');
// var io = socket.listen(server);
/* end socket module */
var router = require('express').Router();
var multer = require('multer')
var { IS_USER } = require('../../../config/constants');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'thongbao')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }   
})

var upload = multer({ storage: storage });

const nodemailer = require('nodemailer');

// Generate test SMTP service account from ethereal.email
// Only needed if you don't have a real mail account for testing
// create reusable transporter object using the default SMTP transport
var transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.email',
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: 'dangquoctienvktl@gmail.com', // generated ethereal user
    pass: 'chinhlatoi68@1' // generated ethereal password
  }
});
var sendMail = function (from, to, subject, content, attachments) {
  let mailOptions = {
    from: from, // '"Tiến kt 👻" <dangquoctienvktl@gmail.com>'
    to: to, //baz@example.com', // list of receivers
    subject: subject, // Subject line
    html: content, // '<b>html here</b>'
    attachments: attachments
    //attachments: [{filename: "errpr.png", path: 'vong1/error.png'},{}]
  };
  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log('Message sent: %s', info.messageId);
    // Preview only available when sending through an Ethereal account
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
  });
}

module.exports = router => {

  router.get('/thong-bao-all', checkPermission(IS_USER), (req, res, next) => {
    return res.render('adminpage/notify/toAll');
  })
  router.get('/thong-bao-specify', checkPermission(IS_USER), (req, res, next) => {
    return res.render('adminpage/notify/specifyTeams');
  })

  //Post notify by gmail  
  router.post('/thong-bao-all', checkPermission(IS_USER) ,upload.array("file1",5), (req, res, next) => {
    let sendTo = "";
    mongoose.model("teams").find({}, (err, teams) => {
      teams.forEach(team => {
        sendTo += team.emailLeader + ", ";
      })
    }); 
    let attachments = [];
    req.files.map( file => {
      attachments.push({filename: file.filename, path: 'thongbao/' + file.filename})
    });
    
    sendMail('"Web Hackathon" <webhackathon@gmail.com>', sendTo , req.body.subject, req.body.content, attachments);
    return res.redirect('/admin/thong-bao-all');
  })

  //Thông báo cho các đội (email leader) được chỉ định
  router.post('/thong-bao-specify', checkPermission(IS_USER) ,upload.array("file1",5), (req, res, next) => {
    let attachments = [];
    req.files.map( file => {
      attachments.push({filename: file.filename, path: 'thongbao/' + file.filename})
    });
    
    sendMail('"Web Hackathon" <webhackathon@gmail.com>', req.body.sendTo , req.body.subject, req.body.content, attachments);
    return res.redirect('/admin/thong-bao-specify');
  })
}
 
 