var express = require('express');
var router = express.Router();

/* GET menu page. */
router.get('/', function(req, res, next) {
    if(req.session.authenticated)
    {
        let usernameSession = req.session.username;
        res.render('menu', {usernameSession});
    }
    else
    {
      res.redirect("/");
    }
});
module.exports = router;
