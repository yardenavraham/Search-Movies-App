var express = require('express');
var router = express.Router();

const moviesBL = require("../BL/moviesBL");

/* GET search movies page. */
router.get('/', async function (req, res, next) {
    console.log(req.session.authenticated);
    if (req.session.authenticated) {
        let genres = await moviesBL.getGenres();
        let languages = await moviesBL.getLanguages();
        res.render('searchMovies', { genres, languages });
    }
    else {
        res.redirect("/");
    }
});

router.post('/searchResults', async function (req, res, next) {

    if (req.session.authenticated) {
        if (req.session.username != "Admin") {
            if (req.session.transactions == 0) {
                res.redirect("/");
            }
            else {
                req.session.transactions--;
            }
        }
        let movieName = req.body.movieName.toLowerCase();
        let genre = req.body.genre;
        let language = req.body.language;

        let movies = await moviesBL.searchMovies(movieName, genre, language);
        let sameGenre = await moviesBL.searchMoviesByGenre(genre);
        res.render('searchResults', { movies, sameGenre });

    }
    else {
        res.redirect("/");
    }
});

router.get('/searchResults/:id', async function (req, res, next) {

    if (req.session.authenticated) {
        if (req.session.username != "Admin") {
            if (req.session.transactions == 0) {
                res.redirect("/");
            }
            else {
                req.session.transactions--;
            }
        }
        let movieId = req.params.id;
        let movieData = await moviesBL.getMovieById(movieId);
        res.render('movie', { movieData });
    }
    else {
        res.redirect("/");
    }
});


module.exports = router;