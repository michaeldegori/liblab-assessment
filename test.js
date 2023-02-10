const theOne = require('./dist/index.js');

theOne.initialize('89b62oFBhBP0yZR3pQZw');

let allMovies;
theOne
  .getAllMovies()
  .then((data) => {
    allMovies = data;
  })
  .catch((error) => {
    console.error(error);
  });

let theReturn;
theOne
  .getMovieById('5cd95395de30eff6ebccde5d')
  .then((data) => {
    theReturn = data;
    console.log({ theReturn });
  })
  .catch((error) => {
    console.error(error);
  });

let theReturnQuotes;
theOne
  .getQuotesByMovieId('5cd95395de30eff6ebccde5d', { limit: 50 })
  .then((data) => {
    theReturnQuotes = data;
    console.log({ theReturnQuotes: theReturnQuotes });
  })
  .catch((error) => {
    console.error(error);
  });
