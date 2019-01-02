var mongoose = require('mongoose');
var { success, errorProcess } = require('../../../services/returnToUser');
var uploadFile = require('../../../services/uploadFile');
var uploadImage = uploadFile.uploadFile('images');
var { checkPermission } = require('../../../services/checkPermission');
var { IS_USER } = require('../../../config/constants')

module.exports = router => {
    //get index
    router.get('/nha-tai-tro', checkPermission(IS_USER), async (req, res, next) => {
        let sponsors = await mongoose.model('sponsors').find();
        return res.render('adminpage/sponsors', {sponsors});
    })

    //get them nha tai tro
    router.get('/nha-tai-tro/them', checkPermission(IS_USER), async (req, res, next) => {
        return res.render('adminpage/sponsors/create');
    })

    //post them nha tai tro
    router.post('/nha-tai-tro/them', uploadImage.any(), checkPermission(IS_USER), async (req, res, next) => {
        try {
            let link = '';
            req.files.length > 0 ? req.files.map(item => {
              const length = item.filename.split('.');
              const fileId = item.filename.split('.')[0];
              const endFile = item.filename.split('.')[length.length - 1];
              // Remove public in destination and add filename in the link
              item.link = item.destination.substring(6, item.destination.length) + '/' + item.filename;
              
              link = item.link;
            }) : null;
            let sponsor = {
              ...req.body,
              linkLogo: link
            }
            console.log(sponsor);
            await mongoose.model('sponsors').create(sponsor);
            return res.redirect('/admin/nha-tai-tro')
          } catch (err) {
            next()
          }
    })

    //get sua nha tai tro
    router.get('/nha-tai-tro/:id/sua', checkPermission(IS_USER), async (req, res, next) => {
        let sponsor = await mongoose.model('sponsors').findById({_id: req.params.id});
        return res.render('adminpage/sponsors/edit', {sponsor});
    })

    //post sua nha tai tro
    router.post('/nha-tai-tro/:id/sua', uploadImage.any(), checkPermission(IS_USER), async (req, res, next) => {
        try {
            let link = '';
            let st = {...req.body}
            console.log(st) ;
            req.files.length > 0 ? req.files.map(item => {
              const length = item.filename.split('.');
              const fileId = item.filename.split('.')[0];
              const endFile = item.filename.split('.')[length.length - 1];
              // Remove public in destination and add filename in the link
              item.link = item.destination.substring(6, item.destination.length) + '/' + item.filename;
              
              link = item.link;
            }) : null;
          let update = {
            ...req.body
          }
          link.length > 0 ? update['linkLogo'] = link : "";
          await mongoose.model('sponsors').findOneAndUpdate({ _id: req.params.id }, update, { new: true })
          return res.redirect('/admin/nha-tai-tro')
        } catch (err) {
          return errorProcess(res, err);
        }
    })

    //delete nha tai tro
    router.delete('/nha-tai-tro/:id/xoa', checkPermission(IS_USER), async (req, res, next) => {
        try {
            await mongoose.model('sponsors').findOneAndDelete({ _id: req.params.id });
            return success(res, "Done", null)
          } catch (err) {
            return errorProcess(res, err);
          }
    })
}