var router = require('express').Router();
var mongoose = require('mongoose');

router.get('/' ,async (req, res, next) => {
  return res.render('adminpage')
})


require('./posts')(router);
require('./users')(router);
require('./exams')(router);
module.exports = router;