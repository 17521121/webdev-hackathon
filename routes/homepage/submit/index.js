var router = require('express').Router();
var mongoose = require('mongoose');
var multer = require('multer')

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'vong1')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})

var upload = multer({ storage: storage })

module.exports = router => {
  //get dang ki
  router.get('/submit/vong1', async (req, res, next) => {
    let sponsors = await mongoose.model('sponsors').find();
    return res.render('homepage/submit/', { sponsors });
  })

  router.post('/submit/vong1', upload.single('file1'), (req, res) => {
    return res.redirect("/");
  });
}