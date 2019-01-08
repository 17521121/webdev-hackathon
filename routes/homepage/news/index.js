var mongoose = require('mongoose');
var { success, errorProcess } = require('../../../services/returnToUser');
module.exports = router => {
  let pageSize  = 10;
  router.get('/bai-viet', async (req, res, next) => {
    try {
      let sponsors = await mongoose.model('sponsors').find();

      let numberNews = await mongoose.model('posts').count();
      let totalPage = Math.ceil( numberNews/pageSize );
      let page = req.param.page || 1;

      let news = await mongoose.model('posts').find().populate('userId')
                                              .sort({"createdDate": -1})
                                              .skip((parseInt(page)-1) * pageSize).limit(pageSize);
      return res.render("homepage/news", {sponsors, news, totalPage, page})
    }
    catch (err) {
      return errorProcess(res, err);
    }
  });

  router.get('/bai-viet/view/:id', async (req, res, next) => {
    try {
      let sponsors = await mongoose.model('sponsors').find();
      let item = await mongoose.model("posts").findById(req.params.id).populate('userId');
      return res.render("homepage/news/view", { item, sponsors });
    }
    catch (err) {
      return errorProcess(res, err);
    }
  });
}