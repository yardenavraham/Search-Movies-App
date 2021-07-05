var express = require('express');
var router = express.Router();

const bl = require("../BL/loginBL")

/* GET request from sending empty form to client. */
router.get('/', function(req, res, next) {
  res.render('login', { msg : ''});
});

router.post('/', async function(req, res, next) {
  let username = req.body.username;
  let password = req.body.pwd;
  
  let isCorrect = await bl.checkUser(username, password);

  if(isCorrect)
  {
    let transactions =  await bl.getNumTransactions(username);
    //Save user data in session
    req.session["authenticated"] = true;
    req.session.username = username;
    req.session.transactions = transactions;
    res.redirect("/menu");
  }
  else
  { 
    res.render('login', {msg : ''});
  }

});

module.exports = router;
