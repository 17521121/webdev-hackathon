var mongoose = require('mongoose');


module.exports.checkTeamPermission = async (req, res, next) => {
    if(!req.signedCookies.team) {
        return res.redirect('/dang-nhap');
    }
    let team = await mongoose.model('teams').findOne({_id: req.signedCookies.team});
    if(!team){
        return res.redirect('/dang-nhap');
    }
    next();
}