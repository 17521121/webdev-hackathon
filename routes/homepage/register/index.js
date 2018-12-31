var router = require('express').Router();

module.exports = router => {
    router.get('/dang-ki', async (req, res, next) => {
        return res.render('homepage/register');
    })
}