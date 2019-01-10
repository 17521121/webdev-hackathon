var router = require('express').Router();
var mongoose = require('mongoose');
var multer = require('multer')
var { constants } = require('../../../config/constants');
var check= require('../../../services/checkTeamPermission');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'vong1')
  },
  onFileUploadStart: function (file) {
    // You now have access to req
    var now = new Date();
    if (now > constants.deadline_vong1)
      return false;
  },
  onFileSizeLimit: function (file) {
    res.send('> The file size exceeds the maximum size allowed (' + constants.MAX_FILE_SIZE_FOR_UPLOAD / (1024 * 1024) + 'MB)');
  },
  onFileUploadComplete: function (file) {
    //console.log('> File \'' + file.fieldname + '\' stored in \'' + file.path + '\'' + (file.truncated ? ' (TRUNCATED).' : '.') );
    res.send('> File' + file.fieldname + 'has been uploaded');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})

var upload = multer({ storage: storage })

module.exports = router => {
  //get dang ki
  router.get('/submit/vong1', check.checkTeamPermission, async (req, res, next) => {
    let sponsors = await mongoose.model('sponsors').find();
    return res.render('homepage/submit', { sponsors });
  })

  router.post('/submit/vong1', check.checkTeamPermission, upload.single('file1'), async (req, res) => {
    // Tìm team và sửa đường dẫn
    console.log(req.file.path)
    return res.redirect("/");
  });
}