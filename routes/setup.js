var router = require('express').Router();
var mongoose = require('mongoose');


var { success } = require('../services/returnToUser')
router.get('/', async (req, res, next) => {
  let insert = {
    username: "ducnm98",
    password: "$2a$10$WkcovgtS.lfmBs5QBrc0iO9F2.Lh/CVgL72yVg4ZpAYOI0thnp8he",
    name: "Nguyễn Minh Đức"
  }
  let usersInfo = await mongoose.model('users').create(insert);
  return success(res, "Done", usersInfo)
});

router.get('/insert-buyer', async (req, res, next) => {
  let insert = {
    name: "Nguyễn Ngọc Phong",
    location:"KTX ĐHQG",
    numberPhone:"0123456789"
  }
  let buyerInfo = await mongoose.model('buyers').create(insert);
  return success(res, "Done", buyerInfo)
});

router.get('/insert-product', async (req, res, next) => {
  try {
    for(var i = 0; i< 20; i++){
      var productName = "Vòng đeo tay "+ i;
      let insert = {
        name: productName,
        description: "<h1>Vòng Đeo Tay</h1>Mô tả cho vòng đeo tay",
        prices: 12000,
        imageLink: "http://www.thaonguyengift.com/wp-content/uploads/2018/10/VONG-DEO-TAY-FAMIANA-01--270x330.jpg"
      }
      let productInfo = await mongoose.model('products').create(insert);
    }
  } catch (error) {
    console.log(error)
  }

  return success(res, "Done", await mongoose.model('products').find())
});

module.exports = router