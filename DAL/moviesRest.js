const axios = require("axios");

exports.getMovies = () =>{
    let resp = axios.get("https://api.tvmaze.com/shows");
    return resp;
}