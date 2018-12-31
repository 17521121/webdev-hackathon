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

router.get('/deleteHaha', async (req, res, next) => {
  let tems = await mongoose.model('teams').find();
    for(const tem of tems){
      await mongoose.model('teams').findOneAndDelete({ _id: tem._id});
    }
     //mongoose.model('teams').findOneAndDelete({ _id: tem._id});
  
  return res.redirect('/admin/doi/vong-1');
});
router.get('/insert-team', async (req, res, next) => {
  let insert = {
    teamName: "team 3",
    leaderId: 'hahaha',
    member: [
    {phone: '0869', mssv: '17520747', name: 'Minh', school: 'UIT'},
    {phone: '1', mssv: '1', name: 'Minh', school: 'ussh'},
    {phone: '2', mssv: '2', name: 'Ninh', school: 'ussh'},
    ],
    isPaid: true,
    submissions:[{
      year: 2018,
      semester: 1,
      score: 7,
      path: ''
    },
    {
        year: 2017,
        semester: 2,
        score: 10,
        path: ''
    }]
  }
  let buyerInfo = await mongoose.model('teams').create(insert);
  return res.redirect('../admin/doi/vong-1');
});

router.get('/insert-team4', async (req, res, next) => {
  let insert = {
    teamName: "team 4",
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
      path: ''
    },
    {
        year: 2017,
        semester: 2,
        score: 10,
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
    {phone: '1', mssv: '887', name: 'Minh', school: 'UIT'},
    {phone: '2', mssv: '12', name: 'haha', school: 'ussh'},
    {phone: '3', mssv: '22', name: 'Ninh', school: 'UI'},
    {phone: '4', mssv: '221', name: 'Ninh', school: 'ussh'},
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

module.exports = router