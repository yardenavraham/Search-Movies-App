const jsonfile = require("jsonfile");


exports.readFile = () => {
    
    return new Promise(async (resolve,reject) =>
    {
        jsonfile.readFile(__dirname + "/newMovies.json", (err, data) =>
        {
            if(err)
            {
                reject(err);
            }
            else
            {
                resolve(data)
            }
        })
    })
}

exports.writeFile = (obj) => {
    return new Promise(async (resolve, reject) => {
        jsonfile.writeFile(__dirname+"/newMovies.json", obj, function (err) {
            if (err) {
                reject(err);
            }
            else {
                resolve('Created !');
            }
        });
    });

}

