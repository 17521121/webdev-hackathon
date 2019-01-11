var mongoose = require('mongoose');
var { success, errorProcess } = require('../../../services/returnToUser');
var slugify = require('slugify');
var { checkPermission } = require('../../../services/checkPermission');
var randomString = require('randomstring');
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
    user: 'webuit@gmail.com', // generated ethereal user
    pass: 'pass' // generated ethereal password
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
  router.post('/thong-bao-all', checkPermission(IS_USER), upload.array("file1", 5), async (req, res, next) => {
    let sendTo = '';
    let teams = await mongoose.model("teams").find({});
    let listsend = await teams.forEach(team => {
      if (team.emailLeader) {
        sendTo += team.emailLeader + ", ";
      }
    })
    let attachments = [];
    await req.files.map(file => {
      attachments.push({ filename: file.filename, path: 'thongbao/' + file.filename })
    });
    if (attachments.length)
      sendMail('"Web Hackathon" <webuit@gmail.com>', sendTo, req.body.subject, req.body.content, attachments);
    else
      sendMail('"Web Hackathon" <webuit@gmail.com>', sendTo, req.body.subject, req.body.content);
    return res.redirect('/admin/thong-bao-all');
  })

  //Thông báo cho các đội (email leader) được chỉ định
  router.post('/thong-bao-specify', checkPermission(IS_USER), upload.array("file1", 5), async (req, res, next) => {
    let attachments = [];
    await req.files.map(file => {
      attachments.push({ filename: file.filename, path: 'thongbao/' + file.filename })
    });
    if (attachments.length)
      sendMail('"Web Hackathon" <webuit@gmail.com>', req.body.sendTo, req.body.subject, req.body.content, attachments);
    else
      sendMail('"Web Hackathon" <webuit@gmail.com>', req.body.sendTo, req.body.subject, req.body.content);
    return res.redirect('/admin/thong-bao-specify');
  })

  //Thông báo random code cho đội qua vòng 1
  router.get('/passround-1', checkPermission(IS_USER), async (req, res, next) => {
    let randCode = await mongoose.model("randCode").find({}).populate("teamId");
    return res.render("adminpage/notify/randCode", { randCode });
  })

  //gửi random code
  router.post('/passround-1', checkPermission(IS_USER), async (req, res, next) => {
    //nodemailer
    let subject = "Chúc mừng đội bạn đã vượt qua vòng 1!"     //subject 
    let content = "Đội bạn đã vượt qua vòng 1, hãy dùng mã code nhận được bên dưới để tham gia vòng 2 nhé! \
                  Hạn dùng của mã code là 1 ngày kể từ thời điểm nhận được mã code";     // content

    let randCode = await mongoose.model("randCode").find({}).populate("teamId");
    await randCode.forEach(team => {
      let sendTo = team.teamId.emailLeader;
      let rand = randomString.generate(8);
      team.text = rand;
      team.expired = new Date().setDate(new Date().getDate() + 1);  //ngày kế tiếp sau khi nhận được mã code
      sendMail('"Web Hackathon" <webuit@gmail.com>', sendTo, subject, content + "\n" + rand);
    })

    return res.redirect("/admin/passround-1");
  })
}

