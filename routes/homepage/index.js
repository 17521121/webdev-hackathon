var router = require('express').Router();
var mongoose = require('mongoose');

router.get('/', async (req, res, next) => {
	// let news = await mongoose.model('news').find().limit(4).sort({ createdDate: -1 })
	// let products = await mongoose.model('products').find().limit(4).sort({ createdDate: -1 })
	return res.render('homepage')
})

require('./testContents')(router)
// require('./news')(router);
// require('./cart')(router);
module.exports = router;