var passport = require("passport");

module.exports = router => {
  router.get('/dang-nhap', async (req, res, next) => {
    return res.render('adminpage/users/login')
  })

  router.post(
    "/dang-nhap",
    passport.authenticate("local", {
      failureRedirect: "/admin/dang-nhap",
      failureFlash: false
    }),
    (req, res) => {
      if (req.body.remember) {
        req.session.cookie.maxAge = new Date(
          Date.now() + 30 * 24 * 60 * 60 * 100000
        ); // Cookie expires after 30 days
      } else {
        req.session.cookie.expires = false; // Cookie expires at end of session
      }
      res.redirect("/admin");
    }
  );
}