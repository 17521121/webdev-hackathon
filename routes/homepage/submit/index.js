var router = require('express').Router();
var mongoose = require('mongoose');
var multer = require('multer')

var uploading = multer({
  dest: __dirname + '../public/vong1/',
  limits: { fileSize: 150 * 1000000, files: 1 } //100mb max
})


module.exports = router => {
  //get dang ki
  router.get('/submit/vong1', async (req, res, next) => {
    let sponsors = await mongoose.model('sponsors').find();
    return res.render('homepage/submit/', { sponsors });
  })


}