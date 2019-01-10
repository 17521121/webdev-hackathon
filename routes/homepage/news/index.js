var mongoose = require('mongoose');
var { success, errorProcess } = require('../../../services/returnToUser');
var { category } = require('../../../config/constants')
module.exports = router => {
  let pageSize = 10;
  router.get('/bai-viet', async (req, res, next) => {
    try {
      let categoryType = req.query.categoryType || null;
      let sponsors = await mongoose.model('sponsors').find();
      let page = req.query.page || 1;
      let numberNews = await mongoose.model('posts').count(categoryType ? { 'category': { "$eq": categoryType } } : { });
      let totalPage = Math.ceil(numberNews / pageSize);
      let news = await mongoose.model('posts').find(categoryType ? { 'category': { "$eq": categoryType } } : { }).populate('userId')
        .sort({ "createdDate": -1 })
        .skip((parseInt(page) - 1) * pageSize).limit(pageSize);
      let categoryCount = [];
      for (const i of category) {
        let numb = await mongoose.model('posts').count({ 'category': { "$eq": i } });
        categoryCount.push({ type: i, numb: numb ? numb : 0 })
      }
      let team = await mongoose.model('teams').findById(req.signedCookies.team);
      return res.render("homepage/news", { sponsors, news, totalPage, page, categoryType, categoryCount, team })
    }
    catch (err) {
      return errorProcess(res, err);
    }
  });

  router.get('/bai-viet/view/:id', async (req, res, next) => {
    try {
      let sponsors = await mongoose.model('sponsors').find();
      let item = await mongoose.model("posts").findById(req.params.id).populate('userId');
      let categoryCount = [];
      for (const i of category) {
        let numb = await mongoose.model('posts').count({ 'category': { "$eq": i } });
        categoryCount.push({ type: i, numb: numb ? numb : 0 })
      }
      return res.render("homepage/news/view", { item, sponsors, categoryCount });
    }
    catch (err) {
      return errorProcess(res, err);
    }
  });

}