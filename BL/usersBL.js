const dal = require("../DAL/usersJson");

exports.getUsers = async function () {
    let users = await dal.readUsers();
    return users;

}

exports.getUserById = async function (id) {
    let users = await dal.readUsers();
    let userData = users.users.find(x => x.id == id);
    return userData;

}

exports.deleteUserById = async function (id) {

    if (id != 1) {
        let users = await dal.readUsers();
        let index = users.users.findIndex(x => x.id == id);
        users.users.splice(index);
        let status = await dal.writeUsers(users);
        return status;
    }
    else {
        return "You can not delete user Admin";
    }

}

exports.addUser = async function (userName, password, createdDate, numTransactions) {
    let users = await dal.readUsers();
    let lastUserJson = users.users[users.users.length - 1];
    let id = lastUserJson.id + 1;

    let obj = {
        "id": id,
        "userName": userName,
        "password": password,
        "createdDate": createdDate,
        "numTransactions": numTransactions
    }

    let temp = { users: users.users.concat(obj) };
    let status = await dal.writeUsers(temp);
    return status;
}

exports.updateUser = async function (id, userName, password, createdDate, numTransactions) {
    let users = await dal.readUsers();

    let index = users.users.findIndex(x => x.id == id);

    let user = users.users[index];
    user.userName = userName;
    user.password = password;
    user.createdDate = createdDate;
    user.numTransactions = numTransactions;
    users.users[index] = user;
    let status = await dal.writeUsers(users);

    return status;

}

exports.isUserExist = async function () {
    let usersData = await dal.readUsers();
    let usersLogindata = usersData.users;
    let obj = usersLogindata.find(x => x.userName == username);
    if (obj) {
        return true;
    }
    else {
        return false;
    }
}