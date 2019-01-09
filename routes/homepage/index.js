var router = require('express').Router();
var mongoose = require('mongoose');

router.get('/', async (req, res, next) => {
	let sponsors = await mongoose.model('sponsors').find();
	let news = await mongoose.model('posts').find().populate('userId')
														.sort({"createdDate": -1})
														.limit(3);
	await console.log(req.isAuthenticated());
	return res.render('homepage', {sponsors, news});
})

require('./register')(router)
require('./login')(router)
require('./submit')(router)
require('./news')(router)
module.exports = router;