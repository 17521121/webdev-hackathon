var router = require('express').Router();
var mongoose = require('mongoose');


var { success } = require('../services/returnToUser')
router.get('/', async (req, res, next) => {
  let insert = {
    username: "ducnm98",
    password: "$2a$10$WkcovgtS.lfmBs5QBrc0iO9F2.Lh/CVgL72yVg4ZpAYOI0thnp8he",
    fullname: "Nguyễn Minh Đức"
  }
  let usersInfo = await mongoose.model('users').create(insert);
  return success(res, "Done", usersInfo)
});

router.get('/insert-buyer', async (req, res, next) => {
  let insert = {
    fullname: "Nguyễn Ngọc Phong",
    location:"KTX ĐHQG",
    numberPhone:"0123456789"
  }
  let buyerInfo = await mongoose.model('buyers').create(insert);
  return success(res, "Done", buyerInfo)
});


module.exports = router