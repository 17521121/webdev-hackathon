var router = require('express').Router();
var mongoose = require('mongoose');
module.exports = router => {
    //get dang ki
    router.get('/dang-ki', async (req, res, next) => {
        let sponsors = await mongoose.model('sponsors').find();
        return res.render('homepage/register', {sponsors});
    })
    //post dang ki
    router.post('/dang-ki', async (req, res, next) => {
        let team = {
            teamName: req.body.teamName,
            leaderId: req.body.MSSV[0]
        }
        let members = [];
        let num = parseInt(req.body.numberOfMem);
        for(let i = 0; i < num; i++){
            members.push({
                name: req.body.name[i],
                MSSV: req.body.MSSV[i],
                phone: req.body.phone[i],
                school: req.body.school[i]
            })
        }
        team.submissions =[{path: '' },{path: ''}];
        team.member = members;
        await mongoose.model('teams').create(team);
        return res.redirect('/dang-ki');
    })

}