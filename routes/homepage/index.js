var router = require('express').Router();
var mongoose = require('mongoose');

router.get('/', async (req, res, next) => {
	let sponsors = await mongoose.model('sponsors').find();
	let news = await mongoose.model('posts').find().populate('userId')
																					.sort({ "createdDate": -1 })
																					.limit(3);
	let teamLogin = await mongoose.model('teams').findById(req.signedCookies.team);
	return res.render('homepage', { sponsors, news, teamLogin });
})
router.get('/info/lien-he', async (req, res, next) => {
	let sponsors = await mongoose.model('sponsors').find();
	let teamLogin = await mongoose.model('teams').findById(req.signedCookies.team);
	return res.render('homepage/inform/contact', { sponsors, teamLogin });
})
router.get('/info/fag', async (req, res, next) => {
	let sponsors = await mongoose.model('sponsors').find();
	let teamLogin = await mongoose.model('teams').findById(req.signedCookies.team);
	return res.render('homepage/inform/fag', { sponsors, teamLogin });
})

require('./register')(router)
require('./login-out')(router)
require('./submit')(router)
require('./news')(router)
module.exports = router;