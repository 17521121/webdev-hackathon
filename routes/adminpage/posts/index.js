var mongoose = require('mongoose');
var { success, errorProcess } = require('../../../services/returnToUser');
var uploadFile = require('../../../services/uploadFile');
var slugify = require('slugify');
var { checkPermission } = require('../../../services/checkPermission');
var { IS_USER } = require('../../../config/constants')

module.exports = router => {
  router.get('/bai-viet', checkPermission(IS_USER), async (req, res, next) => {
    try {
      let posts = await mongoose.model('posts').find().populate('userId');
      return res.render('adminpage/posts', { posts })
    } catch (err) {
      next();
    }
  })

  router.get('/bai-viet/them-bai-viet', checkPermission(IS_USER), async (req, res, next) => {
    return res.render('adminpage/posts/create')
  })
  var uploadImage = uploadFile.uploadFile('images');
  router.post('/bai-viet', [uploadImage.any(),checkPermission(IS_USER)], async (req, res, next) => {
    try {
      let link = [];
      req.files.length > 0 ? req.files.map(item => {
        const length = item.filename.split('.');
        const fileId = item.filename.split('.')[0];
        const endFile = item.filename.split('.')[length.length - 1];
        // Remove public in destination and add filename in the link
        item.link = item.destination.substring(6, item.destination.length) + '/' + item.filename;
        link.push(item.link);
      }) : null;
      user = await mongoose.model('users').findOne({username: req.body.username});
      let insert = {
        ...req.body,
        imageLink: link,
        slug: slugify(`/bai-viet/${req.body.title.toLowerCase()}-${new Date().getTime()}`),
        createdDate: new Date(),
        userId: user._id
      }
      await mongoose.model('posts').create(insert);
      return res.redirect('/admin/bai-viet')
    } catch (err) {
      next()
    }
  })

  router.get('/bai-viet/:id/edit', checkPermission(IS_USER), async (req, res, next) => {
    try {
      let posts = await mongoose.model('posts').findById(req.params.id).populate('userId');
      console.log(posts)
      return res.render('adminpage/posts/edit', { posts })
    } catch (err) {
      console.log(err)
      return errorProcess(res, err);
    }
  })

  router.post('/bai-viet/:id', [uploadImage.any(),checkPermission(IS_USER)], async (req, res, next) => {
    try {
      let link = [];
      req.files.length > 0 ? req.files.map(item => {
        const length = item.filename.split('.');
        const fileId = item.filename.split('.')[0];
        const endFile = item.filename.split('.')[length.length - 1];
        // Remove public in destination and add filename in the link
        item.link = item.destination.substring(6, item.destination.length) + '/' + item.filename;
        link.push(item.link);
      }) : null;
      let update = {
        ...req.body,
      }
      link.length > 0 ? update['imageLink'] = link : null;
      let option = { new: true }
      await mongoose.model('posts').findOneAndUpdate({ _id: req.params.id }, update, option)
      return res.redirect('/admin/bai-viet')
    } catch (err) {
      return errorProcess(res, err);
    }
  })

  router.delete('/bai-viet/:id', checkPermission(IS_USER), async (req, res, next) => {
    try {
      await mongoose.model('posts').findOneAndDelete({ _id: req.params.id });
      return success(res, "Done", null)
    } catch (err) {
      return errorProcess(res, err);
    }
  })
}