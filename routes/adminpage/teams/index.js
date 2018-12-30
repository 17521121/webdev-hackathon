var mongoose = require('mongoose');
var { success, errorProcess } = require('../../../services/returnToUser');
var uploadFile = require('../../../services/uploadFile');
var uploadImage = uploadFile.uploadFile('images');
var { checkPermission } = require('../../../services/checkPermission');
var { IS_USER } = require('../../../config/constants')

module.exports = router => {
  router.get('/thi-sinh', checkPermission(IS_USER), async (req, res, next) => {
    try {
      let teams = await mongoose.model('teams').find().populate('userId');
      return res.render('adminpage/teams', { teams })
    } catch (err) {
      next();
    }
  })

  router.get('/thi-sinh/them-thi-sinh', checkPermission(IS_USER), async (req, res, next) => {
    return res.render('adminpage/teams/create')
  })

// add teams to database
  router.post('/thi-sinh', checkPermission(IS_USER), async (req, res, next) => {
    try {
      await console.log(y);
      let insert = {
        ...req.body,
      }
      await mongoose.model('teams').create(insert);
      return res.redirect('/admin/thi-sinh')
    } catch (err) {
      next()
    }
  })
// edit informations
  router.get('/thi-sinh/:id/edit', checkPermission(IS_USER), async (req, res, next) => {
    try {
      let product = await mongoose.model('teams').findOne({ _id: req.params.id })
      return res.render('adminpage/teams/edit', { product })
    } catch (err) {
      console.log(err)
      return errorProcess(res, err);
    }
  })

  router.get('/thi-sinh/:id', checkPermission(IS_USER), async (req, res, next) => {
    try {
      let product = await mongoose.model('teams').findOne({ _id: req.params.id })
      return success(res, "Done", product)
    } catch (err) {
      return errorProcess(res, err);
    }
  })

  router.post('/thi-sinh/:id', [uploadImage.any(), checkPermission(IS_USER)], async (req, res, next) => {
    
      try {
        let link = [];
        let st = {...req.body}
        console.log(st) ;
        req.files.length > 0 ? req.files.map(item => {
          const length = item.filename.split('.');
          const fileId = item.filename.split('.')[0];
          const endFile = item.filename.split('.')[length.length - 1];
          // Remove public in destination and add filename in the link
          item.link = item.destination.substring(6, item.destination.length) + '/' + item.filename;
          
          link.push(item.link);
        }) : null;
      let update = {
        ...req.body
      }
      link.length > 0 ? update['imageLink'] = link : "";
      let option = { new: true }
      await mongoose.model('teams').findOneAndUpdate({ _id: req.params.id }, update, option)
      return res.redirect('/admin/thi-sinh')
    } catch (err) {
      return errorProcess(res, err);
    }
  })
  //delete product
  router.delete('/thi-sinh/:id', checkPermission(IS_USER), async (req, res, next) => {
    try {
      await mongoose.model('teams').findOneAndDelete({ _id: req.params.id });
      return success(res, "Done", null)
    } catch (err) {
      return errorProcess(res, err);
    }
  })



  
}










