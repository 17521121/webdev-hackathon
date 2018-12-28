var router = require('express').Router();
var mongoose = require('mongoose');

router.get('/' ,async (req, res, next) => {
  return res.render('/adminpage')
})

require('./partials')(router)
require('./posts')(router)
require('./users')(router)

module.exports = router;