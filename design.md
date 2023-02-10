# Design Document for Michael DeGori The One SDK

## Introduction

The One SDK is a TypeScript library that provides a simple and convenient way to access movie data from the API. It is built on top of the Axios library and allows you to retrieve movies, movie details, and quotes from the The One API.

## API Token Initialization

Before accessing any endpoints, you must initialize the API token for authentication purposes. This is done by calling the initialize function and passing in your The One API token as a string.

```javascript
initialize('your-api-token');
```

## Functions

### getAllMovies

This function retrieves all the movies from the API. It returns a promise that resolves to an object containing the data for all movies.

```javascript
getAllMovies().then((movies) => console.log(movies));
```

### getMovieById

This function fetches the details of a movie by its id. It takes the id of the movie as an argument and returns a promise that resolves to an object containing the movie details.

```javascript
getMovieById('movie-id').then((movie) => console.log(movie));
```

### getQuotesByMovieId

This function fetches quotes from a movie by its id. It takes the id of the movie as an argument and an optional options object with the properties limit and page. It returns a promise that resolves to an object containing the movie details and additional information about the number of results, the current page, etc.

```javascript
getQuotesByMovieId('movie-id', { limit: 5, page: 2 }).then((quotes) => console.log(quotes));
```

## Error Handling

The SDK provides centralized error handling through the handleError function. If an error occurs while accessing the API, the error is logged and additional context is added to the error message.

## Conclusion

The Michael DeGori The One SDK provides a convenient and simple way to access movie data from the API. It takes care of authentication and error handling, allowing you to focus on your favorite hobit adventures!
