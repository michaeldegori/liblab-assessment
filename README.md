# Michael DeGori Lord of the Rings SDK

A simple SDK to interact with the [The One API](https://the-one-api.dev/v2).

## Features

- Initialize API with token for authentication from The One API.
- Get list of all Lord of the Rings Movies.
- Get individual movie details by movie id.
- Get quotes from movie by movie id.

## Installation

```
npm install michael-degori-sdk
```

You will need to go to `https://the-one-api.dev/sign-up` to get your access token before using any of the endpoints.

## Usage

Import the SDK using default export

```javascript
import theOne from 'michael-degori-sdk';
```

OR abstracts specific methods

```javascript
import { initialize, getAllMovies, getMovieById, getQuotesByMovieId } from 'michael-degori-sdk';
```

Initialize withAPI token

```javascript
initialize('your-api-token');
```

Access the endpoints

```javascript
// Get all movies
getAllMovies()
  .then((movies) => console.log(movies))
  .catch((error) => console.error(error));

// Get movie by id
getMovieById('5f569a14ebd5af5b5c73b1e5')
  .then((movie) => console.log(movie))
  .catch((error) => console.error(error));

// Get quotes by movie id
getQuotesByMovieId({ id: '5f569a14ebd5af5b5c73b1e5', options: { limit: 10, page: 1 } })
  .then((quotes) => console.log(quotes))
  .catch((error) => console.error(error));
```

## getAllMovies

This function fetches all Lord of the Rings movies.

### Returns

- Returns a `Promise` that resolves to an object with the following shape:

```javascript
{
  docs: [{  // An array of movies
    _id: string,
    name: string,
    runtimeInMinutes: number,
    budgetInMillions: number,
    boxOfficeRevenueInMillions: number,
    academyAwardNominations: number,
    academyAwardWins: number,
    rottenTomatoesScore: number,
  }],
  total: number,  // Total number of results
  limit: number,  // Number of results per page
  page: number,  // Current page number
  pages: number  // Total number of pages
}
```

### Example

```javascript
getAllMovies()
  .then((data) => {
    console.log(data);
  })
  .catch((error) => {
    console.error(error);
  });
```

## getMovieById

This function fetches the details of a movie by its `id`.

### Parameters

- `id` (string): The id of the movie that is to be fetched

### Returns

- Returns a `Promise` that resolves to an object with the following shape:

```javascript
{
    _id: string,
    name: string,
    runtimeInMinutes: number,
    budgetInMillions: number,
    boxOfficeRevenueInMillions: number,
    academyAwardNominations: number,
    academyAwardWins: number,
    rottenTomatoesScore: number,
}
```

### Example

```javascript
getMovieById('1234')
  .then((data) => {
    console.log(data);
  })
  .catch((error) => {
    console.error(error);
  });
```

## getQuotesByMovieId

This function fetches quotes from a movie by its `id`.

### Parameters

- `id` (string): The id of the movie from which the quotes are to be fetched
- `options` (object) [optional]: An object containing the `limit` and `page` number of the results. Default is `{ limit: 10, page: 1 }`.

### Returns

- Returns a `Promise` that resolves to an object with the following shape:

```javascript
{
  docs: [{
    _id: string,  // The id of the quote
    dialog: string,  // The requested quote
    movie: string,  // The id of the movie
    character: string, // The id of the character
    id: string, // The id of the quote
  }],
  total: number,  // Total number of results
  limit: number,  // Number of results per page
  page: number,  // Current page number
  pages: number  // Total number of pages
}
```

### Example

```javascript
getQuotesByMovieId('1234', { limit: 10, page: 2 })
  .then((data) => {
    console.log(data);
  })
  .catch((error) => {
    console.error(error);
  });
```

## Error Handling

In the event of an error during an API request, the SDK will throw an error with the following shape:

```javascript
{
  status: number,  // HTTP status code of the error
  message: string  // Error message
}
```

In addition to throwing the error, the SDK also logs error messages to the console for debugging purposes. The error status code and error message will be logged to the console if the error has a response property. If the error has a request property, the SDK will log a message indicating that no response was received from the server. If neither of these properties is present, the SDK will simply log the error message.
