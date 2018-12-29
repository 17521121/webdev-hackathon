var router = require('express').Router();
var mongoose = require('mongoose');
var posts = require('./posts');
var users = require('./users');

router.get('/' ,async (req, res, next) => {
  return res.render('adminpage')
})


require('./posts')(router);
require('./users')(router);

module.exports = router;