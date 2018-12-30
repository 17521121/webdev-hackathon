var mongoose = require('mongoose');
var { success, errorProcess } = require('../../../services/returnToUser');

module.exports = router => {
    //get admin/doi
    router.get('/doi', async (req, res, next) => {
        let teams = await mongoose.model('teams').find();
        let option = ''; 
        return res.render('adminpage/teams', {teams, option});
    })
    //post thanh toan 
    router.post('/doi/vong-1/:id/thanh-toan', async (req, res, next) => {
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
    router.get('/doi/:id/view', async (req, res, next) => {
        let team = await mongoose.model('teams').findOne({ _id: req.params.id});
        console.log(team);
        return res.render('adminpage/teams/view', {team});
    })
    //get admin/doi
    router.get('/doi/:op', async (req, res, next) => {
        let teams = await mongoose.model('teams').find();
        return res.render('adminpage/teams', {teams, option : req.params.op});
    })

}