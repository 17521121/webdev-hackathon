var mongoose = require('mongoose');
var uploadFile = require('../../services/uploadFile');


module.exports = router => {

  var uploadImage = uploadFile.uploadFile('images');
  // To call this function use method post to /api/upload/image
  router.post('/upload/image', uploadImage.single('image'), (req, res, next) => {
    const length = req.file.filename.split('.');
    const fileId = req.file.filename.split('.')[0];
    const endFile = req.file.filename.split('.')[length.length - 1];
    // Remove public in destination and add filename in the link
    req.file.link = req.file.destination.substring(6, req.file.destination.length) + '/' + req.file.filename;
    return res.send({
      id: fileId,
      link: req.file.link,
      name: req.file.originalname,
    })
  })

};
