var router = require('express').Router();
var mongoose = require('mongoose');


var { success } = require('../services/returnToUser')
router.get('/', async (req, res, next) => {
  let insert = {
    username: "ducnm98",
    password: "$2a$10$WkcovgtS.lfmBs5QBrc0iO9F2.Lh/CVgL72yVg4ZpAYOI0thnp8he",
    fullname: "Nguyễn Minh Đức"
  }
  let usersInfo = await mongoose.model('users').create(insert);
  return success(res, "Done", usersInfo)
});

router.get('/check-teams', async (req, res, next) => {
  let teams = await mongoose.model('teams').find();
     console.log(teams);
  
  return res.redirect('/admin/doi/vong-1');
});

router.get('/deleteData', async (req, res, next) => {
  let tems = await mongoose.model('teams').find();
    for(const tem of tems){
      await mongoose.model('teams').findOneAndDelete({ _id: tem._id});
    }
  let randCode = await mongoose.model('randCode').find();
    for(const tem of randCode){
      await mongoose.model('randCode').findOneAndDelete({ _id: tem._id});
    }
  let sponsors = await mongoose.model('sponsors').find();
  for(const tem of sponsors){
    await mongoose.model('sponsors').findOneAndDelete({ _id: tem._id});
  }
  
  return res.redirect('/admin/doi/vong-1');
});

router.get('/delete', async (req, res, next) => {
 
    await mongoose.model('randCode').findOneAndDelete({ _id: '5c2a44508b2e5a083066d6d6'});
    //await mongoose.model('teams').findOneAndDelete({ _id: '5c2a41353b767426cc9add6a'});
  
  return res.redirect('/admin/doi/vong-1');
});
//show teams
router.get('/teams', async (req, res, next) => {
 
    let teams = await mongoose.model('teams').find()
    console.log(teams);
  
  return res.redirect('/admin/doi/vong-1');
});

router.get('/insert-team6', async (req, res, next) => {
  let insert = {
    teamName: "team 6",
    leaderId: 'hahaha',
    member: [
    {phone: '0869', MSSV: '17520747', name: 'Minh', school: 'UIT'},
    {phone: '1', MSSV: '1', name: 'Minh', school: 'ussh'},
    {phone: '2', MSSV: '2', name: 'Ninh', school: 'ussh'},
    ],
    isPaid: true,
    submissions:[{
      path: ''
    },
    {
        path: ''
    }]
  }
  let buyerInfo = await mongoose.model('teams').create(insert);
  return res.redirect('../admin/doi/vong-1');
});

router.get('/insert-team5', async (req, res, next) => {
  let insert = {
    teamName: "team 5",
    leaderId: 'team',
    member: [
    {phone: '0869', mssv: '17520747', name: 'Minh', school: 'UIT'},
    {phone: '1', mssv: '1', name: 'Minh', school: 'ussh'},
    {phone: '2', mssv: '2', name: 'Ninh', school: 'ussh'},
    ],
    isPaid: true,
    submissions:[{
      year: 2018,
      semester: 1,
      path: '',
      score: 1
    },
    {
        year: 2017,
        semester: 2,
        path: ''
    }]
  }
  let buyerInfo = await mongoose.model('teams').create(insert);
  return res.redirect('../admin/doi/vong-1');
});

router.get('/insert-team2', async (req, res, next) => {
  let insert = {
    teamName: "team 2",
    leaderId: '887',
    member: [
    {phone: '1', MSSV: '887', name: 'Minh', school: 'UIT'},
    {phone: '2', MSSV: '12', name: 'haha', school: 'ussh'},
    {phone: '3', MSSV: '22', name: 'Ninh', school: 'UI'},
    {phone: '4', MSSV: '221', name: 'Ninh', school: 'ussh'},
    ],
    isPaid: false,
    submissions:[{
      year: 2018,
      semester: 1,
      score: 9,
      path: ''
    },
    {
        year: 2017,
        semester: 2,
        score: 5,
        path: ''
    }]
  }
  let buyerInfo = await mongoose.model('teams').create(insert);
  return res.redirect('../admin/doi/vong-1');
});
 
  setup: (models, courseYear) => {
    return new Promise(async (resolve, reject) => {
      try {
        
      }
       catch (err) {
        reject (err);
      }
    });
  }
 
module.exports = router