var router = require('express').Router();
var mongoose = require('mongoose');

router.get('/', async (req, res, next) => {
	return res.render('homepage')
})

require('./testContents')(router)
module.exports = router;