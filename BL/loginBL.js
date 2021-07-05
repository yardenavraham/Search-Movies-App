const dal = require("../DAL/usersJson");

exports.checkUser = async function (username, password){
    let usersData = await dal.readUsers();
    let usersLogindata = usersData.users;
    let obj = usersLogindata.find(x=> x.userName == username && x.password == password);
    if(obj)
    {
        return true;
    }
    else
    {
        return false;
    }
}

exports.getNumTransactions = async function(username){
    let usersData = await dal.readUsers();
    let usersLogindata = usersData.users;
    let user = usersLogindata.find(x=> x.userName == username);
    return user.numTransactions;
}

