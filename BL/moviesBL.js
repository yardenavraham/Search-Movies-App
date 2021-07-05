const { json } = require("express");
const dal = require("../DAL/moviesRest");
const dalJson = require("../DAL/newMovieJson");


exports.getGenres = async () => {
    let movies = await dal.getMovies();
    let moviesData = movies.data;
    let genres = moviesData.map(x => x.genres);
    let genresArr = [].concat.apply([], genres);
    let uniqueGenres = [...new Set(genresArr)].sort();
    return uniqueGenres;
}

exports.getLanguages = async () => {
    let movies = await dal.getMovies();
    let moviesData = movies.data;
    let languages = moviesData.map(x => x.language);
    let uniqueLanguages = [...new Set(languages)].sort();
    return uniqueLanguages;
}

exports.searchMovies = async function (movieName, genre, language) {

    //Get results from REST API
    let movies = await dal.getMovies();
    let moviesData = movies.data;
    let resRest = moviesData.filter(x => {
        let name = x.name.toLowerCase();

        if (name.includes(movieName) && x.language == language && x.genres.includes(genre)) {
            return x;
        }
    });

    let topFive = resRest.slice(0, 5);

    //Get results from json
    let moviesJson = await dalJson.readFile();
    let resJson = moviesJson.movies.filter(x => {
        let name = x.name.toLowerCase();

        if (name.includes(movieName) && x.language == language && x.genres.includes(genre)) {
            return x;
        }
    });

    //Union results
    let allResults = resJson.concat(topFive);

    return allResults;
}

exports.createMovie = async function (movieName, language, genres) {

    let moviesData = await dalJson.readFile();
    let id;
    if (moviesData.movies.length == 0)//Json file is empty
    {
        let moviesRest = await dal.getMovies();
        let moviesDataRest = moviesRest.data;
        let lastMovieRest = moviesDataRest[moviesDataRest.length - 1];
        id = lastMovieRest.id + 1;

    }
    else {
        let lastMovieJson = moviesData.movies[moviesData.movies.length - 1];
        id = lastMovieJson.id + 1;
    }

    let obj = { "id": id, "name": movieName, "language": language, "genres": genres };
    let temp = { movies: moviesData.movies.concat(obj) };
    let answer = await dalJson.writeFile(temp);
    return answer;
}

exports.searchMoviesByGenre = async function (genre) {

    //Same genre from REST
    let movies = await dal.getMovies();
    let moviesData = movies.data;
    let sameGenre = moviesData.filter(x => x.genres.includes(genre));
    let topFive = sameGenre.slice(0, 5);

    //Same genre from json
    let moviesJson = await dalJson.readFile();
    let jsonData = moviesJson.movies.filter(x => x.genres.includes(genre));


    //Union
    return jsonData.concat(topFive);
}

exports.getMovieById = async function (id) {
    let moviesRest = await dal.getMovies();
    let moviesRestData = moviesRest.data;
    let moviesJson = await dalJson.readFile();
    let union = moviesRestData.concat(moviesJson.movies);
    let movie = union.find(x => x.id == id);
    return movie;
}