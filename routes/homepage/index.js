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
router.get('/info/fag/the-le', async (req, res, next) => {
	let sponsors = await mongoose.model('sponsors').find();
	let teamLogin = await mongoose.model('teams').findById(req.signedCookies.team);
	return res.render('homepage/inform/rules', { sponsors, teamLogin });
})
//about
router.get('/info/fag/ve-chung-toi', async (req, res, next) => {
	let sponsors = await mongoose.model('sponsors').find();
	let teamLogin = await mongoose.model('teams').findById(req.signedCookies.team);
	return res.render('homepage/inform/about', { sponsors, teamLogin });
})
//plan
router.get('/info/fag/ke-hoach', async (req, res, next) => {
	let sponsors = await mongoose.model('sponsors').find();
	let teamLogin = await mongoose.model('teams').findById(req.signedCookies.team);
	return res.render('homepage/inform/plans', { sponsors, teamLogin });
})
//rule-mark
router.get('/info/fag/cham-diem', async (req, res, next) => {
	let sponsors = await mongoose.model('sponsors').find();
	let teamLogin = await mongoose.model('teams').findById(req.signedCookies.team);
	return res.render('homepage/inform/rule-mark', { sponsors, teamLogin });
})

require('./register')(router)
require('./login-out')(router)
require('./submit')(router)
require('./news')(router)
module.exports = router;