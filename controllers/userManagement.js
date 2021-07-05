var express = require('express');
var router = express.Router();

const usersBL = require("../BL/usersBL");

/* GET all users. */
router.get('/', async function(req, res, next) {
    let users = await usersBL.getUsers();
    let usersData = users.users;
    res.render('userManagement', {usersData});
});


/* GET add new user form. */
router.get('/addUser', function(req, res, next) {

    let userData;
    res.render('userData', {userData});
});

/* POST add new user form. */
router.post('/addUser', async function(req, res, next) {

    let userName = req.body.username;
    // let isExist = usersBL.isUserExist(userName);
    let password = req.body.pwd;
    let createdDate = req.body.date;
    let numTransactions = req.body.numTransactions;
    let status = await usersBL.addUser(userName,password,createdDate,numTransactions);
    res.redirect('/userManagement');
});

/* GET update user */
router.get('/update/:id', async function(req, res, next) {

    let userId = req.params.id;
    let userData = await usersBL.getUserById(userId);

    res.render('userData', {userData});
});

/* POST add new user form. */
router.post('/update/:id', async function(req, res, next) {

    let userId = req.params.id;
    let userName = req.body.username;
    let password = req.body.pwd;
    let createdDate = req.body.date;
    let numTransactions = req.body.numTransactions;
    let status = await usersBL.updateUser(userId,userName,password,createdDate,numTransactions);
    res.redirect('/userManagement');
});

/* GET delete user */
router.get('/delete/:id', async function(req, res, next) {

    let userId = req.params.id;
    let status = await usersBL.deleteUserById(userId);
    res.redirect('/userManagement');
});


module.exports = router;