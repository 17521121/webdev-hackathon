var router = require('express').Router();
var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

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
            emailLeader: req.body.emailLeader,
            password: req.body.password
        }
        let members = [];
        for(let i = 0; i < 2; i++){
            members.push({
                name: req.body.name[i],
                MSSV: req.body.MSSV[i],
                phone: req.body.phone[i],
                school: req.body.school[i]
            })
        }
        team.submissions =[{path: '' },{path: ''}];
        team.member = members;
        const saltRounds = 10;
        bcrypt.hash(team.password, saltRounds, async (err, hash) => {
            team.password = hash;
            await mongoose.model('teams').create(team);
        });
        
        
        return res.redirect('/dang-ki');
    })

}