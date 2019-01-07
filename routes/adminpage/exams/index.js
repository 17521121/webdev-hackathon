
var mongoose = require('mongoose');
var { success, errorProcess } = require('../../../services/returnToUser');
var uploadFile = require('../../../services/uploadFile');
var uploadImage = uploadFile.uploadFile('images');
var { checkPermission } = require('../../../services/checkPermission');
var { IS_USER } = require('../../../config/constants')

module.exports = router => {
    router.get('/de-thi', async (req, res, next) => {
        try {
            let tests = await mongoose.model('testContents').find();
            return res.render('adminpage/exams', {tests});
        }
        catch (err) {
            console.log(err);
        }
    })
    //get tao de thi
    router.get('/de-thi/tao-de-thi', async (req, res, next) => {
        try {
            return res.render('adminpage/exams/create');
        }
        catch (err){
            console.log(err);
        }
    })
    //post tao de thi
    router.post('/de-thi/tao-de-thi', async (req, res, next) => {
        try {
            let insert = {
              ...req.body
            }
            await mongoose.model('testContents').create(insert);
            return res.redirect('/admin/de-thi');
          } catch (err) {
            next()
          }
    })
  
    //edit de thi
    router.get('/de-thi/:id/edit', async (req, res, next) => {
        try {
          let test = await mongoose.model('testContents').findOne({ _id: req.params.id })
          return res.render('adminpage/exams/edit', { test })
        } catch (err) {
          console.log(err)
          return errorProcess(res, err);
        }
      })

    //edit de thi POST
    router.post('/de-thi/:id/edit', async (req, res, next) => {
        try {
          let update = {
              ...req.body
          }  
          await mongoose.model('testContents').findOneAndUpdate({ _id: req.params.id }, update, {new: true});
          return res.redirect('../');
        } catch (err) {
          console.log(err)
          return errorProcess(res, err);
        }
    })

    //view de thi
    router.get('/de-thi/:id/view', async (req, res, next) => {
        try {
          let test = await mongoose.model('testContents').findOne({ _id: req.params.id })
          return res.render('adminpage/exams/view', { test })
        } catch (err) {
          console.log(err)
          return errorProcess(res, err);
        }
      })
    //xóa de thi DELETE
    router.delete('/de-thi/:id', async (req, res, next) => {
        try {
          await mongoose.model('testContents').findOneAndDelete({ _id: req.params.id });
          return success(res, "Done", null)
        } catch (err) {
          return errorProcess(res, err);
        }
      })
}