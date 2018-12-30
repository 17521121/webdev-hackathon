
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
    //test phá 
    // router.get('/pha', async (req, res, next) => {
    //     try {
    //         insert = await mongoose.model('testContents').find();
    //         await mongoose.model('testContents').findByIdAndDelete({_id: '5c2744457ccd222bd0f90bf8'});
    //         await mongoose.model('testContents').findByIdAndDelete({_id: '5c2756b6f211a505849642da'});
    //         await mongoose.model('testContents').findByIdAndDelete({_id: '5c27574ba71943202053ae04'});
    //         await mongoose.model('testContents').findByIdAndDelete({_id: '5c275797d06e23344cd5a1b5'});
    //         await mongoose.model('testContents').findByIdAndDelete({_id: '5c275fd0483edc3550617fbf'});
    //         console.log(insert);
    //       } catch (err) {
    //         next()
    //       }
    // })
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

      
      router.get('/san-pham', checkPermission(IS_USER), async (req, res, next) => {
        try {
          let products = await mongoose.model('products').find();
          return res.render('adminpage/products', { products })
        } catch (err) {
          next();
        }
      })
    
      router.get('/san-pham/them-san-pham', checkPermission(IS_USER), async (req, res, next) => {
        return res.render('adminpage/products/create')
      })
    
    
    // add product to database
      router.post('/san-pham', uploadImage.any(), checkPermission(IS_USER), async (req, res, next) => {
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
          let insert = {
            ...req.body,
            imageLink: link
          }
          await mongoose.model('products').create(insert);
          return res.redirect('/admin/san-pham')
        } catch (err) {
          next()
        }
      })
    // edit informations
      router.get('/san-pham/:id/edit', checkPermission(IS_USER), async (req, res, next) => {
        try {
          let product = await mongoose.model('products').findOne({ _id: req.params.id })
          return res.render('adminpage/products/edit', { product })
        } catch (err) {
          console.log(err)
          return errorProcess(res, err);
        }
      })
    
      router.get('/san-pham/:id', checkPermission(IS_USER), async (req, res, next) => {
        try {
          let product = await mongoose.model('products').findOne({ _id: req.params.id })
          return success(res, "Done", product)
        } catch (err) {
          return errorProcess(res, err);
        }
      })
    
      router.post('/san-pham/:id', [uploadImage.any(), checkPermission(IS_USER)], async (req, res, next) => {
        
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
          await mongoose.model('products').findOneAndUpdate({ _id: req.params.id }, update, option)
          return res.redirect('/admin/san-pham')
        } catch (err) {
          return errorProcess(res, err);
        }
      })
      //delete product
      router.delete('/san-pham/:id', checkPermission(IS_USER), async (req, res, next) => {
        try {
          await mongoose.model('products').findOneAndDelete({ _id: req.params.id });
          return success(res, "Done", null)
        } catch (err) {
          return errorProcess(res, err);
        }
      })
    
}