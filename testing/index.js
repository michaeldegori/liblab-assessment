const theOne = require('michael-degori-sdk');

theOne.initialize({ apiToken: '89b62oFBhBP0yZR3pQZw' });

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
  .getMovieById({ id: '5cd95395de30eff6ebccde5d' })
  .then((data) => {
    theReturn = data;
    console.log({ theReturn });
  })
  .catch((error) => {
    console.error(error);
  });
