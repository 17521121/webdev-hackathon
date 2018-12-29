var router = require('express').Router();
var mongoose = require('mongoose');
var { checkPermission } = require('../../services/checkPermission');
var { IS_USER } = require('../../config/constants')

router.get('/', checkPermission(IS_USER), async (req, res, next) => {
  return res.render('adminpage')
})

require('./login')(router);
require('./posts')(router);
require('./users')(router);
require('./exams')(router);
module.exports = router;