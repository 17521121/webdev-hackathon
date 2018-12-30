var bcrypt = require('bcryptjs');
var mongoose = require('mongoose');
var { checkPermission } = require('../../../services/checkPermission');
var { IS_USER } = require('../../../config/constants')
var { success, errorProcess } = require('../../../services/returnToUser');

module.exports = router => {
  //index
  router.get('/cong-tac-vien',checkPermission(IS_USER), async (req, res, next) => {
    let users = await mongoose.model('users').find();
    return res.render('adminpage/users', { users })
  })
  //dang-ki
  router.get('/dang-ki',checkPermission(IS_USER), async (req, res, next) => {
    return res.render('adminpage/users/register')
  })

  router.post("/dang-ki",checkPermission(IS_USER), async (req, res) => {
    try {
      let list_users = await mongoose.model('users').find();
      for (let someOne of list_users) {
        if (someOne.username == req.body.username) {
          return res.send('tên đăng nhập đã tồn tại');
        }
      }
      let user = {
        ...req.body
      }
      const saltRounds = 10;
      bcrypt.hash(user.password, saltRounds, async (err, hash) => {
        user.password = hash;
        await mongoose.model('users').create(user)
      });
      res.redirect("/admin/cong-tac-vien");
    }
    catch (err) {
      return res.send('Có lỗi phát sinh trong quá trình tạo tài khoản');
    }
  }
  );
}