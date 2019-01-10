var router = require('express').Router();
var mongoose = require('mongoose');
var multer = require('multer')
var constants = require('../../../config/constants');
var check= require('../../../services/checkTeamPermission');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'vong1')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})
var upload = multer({ 
  storage: storage,
  limits: { fileSize: constants.MAX_FILE_SIZE_FOR_UPLOAD } 
})

module.exports = router => {
  //get dang ki
  router.get('/submit/vong1', check.checkTeamPermission, async (req, res, next) => {
    let sponsors = await mongoose.model('sponsors').find();
    let teamLogin = await mongoose.model('teams').findById(req.signedCookies.team);
    return res.render('homepage/submit', { sponsors, deadline: constants.deadline_vong1, teamLogin });
  })

  router.post('/submit/vong1', check.checkTeamPermission, 
    (req, res, next) => {
      return( now - deadline_vong1 < 0 )? next() : res.redirect('/submit/vong1') ;
    }, upload.single('file1'), async (req, res) => {
      // Tìm team và sửa đường dẫn
      //console.log(req.file.path)
      return res.redirect("/");
    });
}