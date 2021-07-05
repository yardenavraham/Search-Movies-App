var express = require('express');
var router = express.Router();

const moviesBL = require("../BL/moviesBL");

/* GET creact movie page. */
router.get('/', async function (req, res, next) {
  let genres = await moviesBL.getGenres();
  res.render('createMovie', { genres });
});

/* POST the new movie and add it to the json file.*/
router.post('/', async function (req, res, next) {
  if (req.session.authenticated) {
    if (req.session.username != "Admin") {
      if (req.session.transactions != 0) {
        req.session.transactions--;
      }
      else {

        res.redirect("/");
      }
    }
    let name = req.body.movieName;
    let language = req.body.language;
    let genres = req.body.genres;

    let answer = await moviesBL.createMovie(name, language, genres);
    res.redirect("/menu");
  }
  else {
    res.redirect('/');
  }
});

module.exports = router;