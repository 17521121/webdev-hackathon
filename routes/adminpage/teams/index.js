var mongoose = require('mongoose');
var { success, errorProcess } = require('../../../services/returnToUser');
var { checkPermission } = require('../../../services/checkPermission');
var { IS_USER } = require('../../../config/constants')

module.exports = router => {
    //get admin/doi
    router.get('/doi', checkPermission(IS_USER), async (req, res, next) => {
        let teams = await mongoose.model('teams').find();
        let option = ''; 
        console.log(teams);
        return res.render('adminpage/teams', {teams, option});
    })
    //post thanh toan 
    router.post('/doi/trang-thai/:id/thanh-toan', checkPermission(IS_USER), async (req, res, next) => {
        try {
            let team = await mongoose.model('teams').findOne({ _id: req.params.id });
            team.isPaid = true;
            await mongoose.model('teams').findOneAndUpdate({ _id: req.params.id}, team, {new: true});
            return success(res, "Done", null)
        }
        catch (err){
            console.log(err);
            return errorProcess(res, err);
        }
    })
    //get xem thong tin nhom
    router.get('/doi/:id/view', checkPermission(IS_USER), async (req, res, next) => {
        let team = await mongoose.model('teams').findOne({ _id: req.params.id});
        console.log(team);
        return res.render('adminpage/teams/view', {team});
    })
    //post update score
    router.post('/doi/:id/update-score',  checkPermission(IS_USER), async (req, res, next) => {
        let update = { ...req.body }
        let userId = req.user._id;
        let team = await mongoose.model('teams').findOne({ _id: req.params.id });
        let judgeSub_1 = team.submissions[0].judge;
        let judgeSub_2 = team.submissions[1].judge;
        if(team.submissions[0].score != update.score[0]) {
            team.submissions[0].score = update.score[0];
            judgeSub_1.push(userId);
            team.submissions[0].judge = judgeSub_1;
        }
        if(team.submissions[1].score != update.score[1]) {
            team.submissions[1].score = update.score[1];
            judgeSub_2.push(userId);
            team.submissions[1].judge = judgeSub_2;
        }
        await mongoose.model('teams').findByIdAndUpdate({ _id: req.params.id }, team, {new: true});
        return res.redirect('../../doi');
    })
    //get admin/doi
    router.get('/doi/:op', checkPermission(IS_USER), async (req, res, next) => {
        let teams = await mongoose.model('teams').find();
        return res.render('adminpage/teams', {teams, option : req.params.op});
    })

}