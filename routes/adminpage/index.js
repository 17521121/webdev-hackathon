var router = require('express').Router();
var mongoose = require('mongoose');
var { checkPermission } = require('../../services/checkPermission');
var { IS_USER } = require('../../config/constants')

router.get('/', checkPermission(IS_USER),async (req, res, next) => {
  let countUsers = await  mongoose.model("users").count();
 
  //so luong teams đã đăng kí
  let countRegister =  await mongoose.model("teams").count();
  
  //số lượng đã nộp vòng 1: 
  let teams = await mongoose.model("teams").find();
  let countJoined = 0;

  for (const team of teams) {
    for(const submission of team.submissions) {
      if(submission.score > 0) {
        countJoined += 1;
        break;
      }
    }
  }
  return res.render('adminpage', { countUsers, countRegister,countJoined } );
})

require('./teams')(router);
require('./login')(router);
require('./posts')(router);
require('./users')(router);
require('./exams')(router);
require('./teams')(router);
require('./notify')(router);
require('./sponsors')(router);
module.exports = router;