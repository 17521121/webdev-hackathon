var router = require('express').Router();
var mongoose = require('mongoose');

router.get('/', async (req, res, next) => {
	let sponsors = await mongoose.model('sponsors').find();
	return res.render('homepage', {sponsors});
})

require('./tests')(router)
require('./register')(router)
module.exports = router;