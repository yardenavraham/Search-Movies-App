const jsonfile = require("jsonfile");

exports.readUsers = () =>{
    return new Promise((resolve, reject) => {
        jsonfile.readFile(__dirname+"/users.json", (err, res) => {
            if (err) {
                reject(err);
            };
            resolve(res);
        });
    });
}


exports.writeUsers = (obj) => {
    return new Promise(async (resolve, reject) => {
        jsonfile.writeFile(__dirname+"/users.json", obj, function (err) {
            if (err) {
                reject(err);
            }
            else {
                resolve('Created !');
            }
        });
    });

}
