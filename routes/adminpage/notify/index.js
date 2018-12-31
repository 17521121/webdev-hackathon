var mongoose = require('mongoose');
var { success, errorProcess } = require('../../../services/returnToUser');
var uploadFile = require('../../../services/uploadFile');
var slugify = require('slugify');
var { checkPermission } = require('../../../services/checkPermission');
var { IS_USER } = require('../../../config/constants')
var { nodemailer } = require('../../../services/sendEmail');

var express = require('express');
var app = express();
var server = require('http').createServer(app);
var socket = require('socket.io');
var io = socket.listen(server);

module.exports = router => {

  router.get('/thong-bao/tat-ca', (req, res, next) => {
    return res.render('adminpage/notify/toAll');
  })
  router.get('/thong-bao/doi', (req, res, next) => {
    return res.render('adminpage/notify/specifyTeams');
  })

  //Post notify by gmail and notification homepage to all
  router.post('/thong-bao/tat-ca', checkPermission(IS_USER), (req, res, next) => {
    let sendTo = "";
    mongoose.model("teams").find({}, (err, teams) => {
      for (const team of teams) {
        for (const member of team.member) {
          sendTo = member.MSSV + "@gm.uit.edu.vn, ";
        }
      }
    });
    //send email
    Send(sendTo, req.body.subject, req.body.content);
    //Thông báo cho người dùng
    io.on('connection', function (socket) {
      socket.on('msg', function (data) {
        //to all member
        io.sockets.emit('msg', {
          msg: data.msg
        });
      });
    });

    return res.render('adminpage');
  })

  //Thông báo cho các đội (mssv leader) được chỉ định
  router.post('/thong-bao/doi', checkPermission(IS_USER), (req, res, next) => {

    //send email
    Send(req.body.sendTo, req.body.subject, req.body.content);

    //get teamId of teams
    let teamId = [];

    let mailLeader = req.body.leaderId.split(",;");
    for(const i of mailLeader) {
      let mssv = i.trim().split("@");
      let team = mongoose.model("teams").findOne({leaderId: mssv[0]});
      teamId.push(team._id);
    }

    //Thông báo cho người dùng
    io.on('connection', function (socket) {
      socket.on('msg', function (data) {
        io.sockets.in(teamId).emit('msg', {
          msg: data.msg
        });
      });
    });

    return res.render('adminpage');
  })


}
/* NOTES */
/* scripts paste to client to get notify

     $.ajax({
           type: "POST",
           url: "(some_url)",
           data: $("id_form").serialize(),
           dataType: "json",
           beforeSend:function(){
               alert('bla..bla..');
           },
           success: function (result) {
               if (result.status) {
                   var socket = io.connect('http://' + window.location.hostname + ':3000');
                   socket.emit('new_count_message', {
                       new_count_message: result.new_count_message
                   });
               } else if (result.status == false) {
                   alert(error);
                   return false;
               }
           },
           error: function(xhr, Status, error) {
               alert(error);
           }
       });

   */