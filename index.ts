import axios from 'axios';

const API_URL: string = 'https://the-one-api.dev/v2';

const axiosInstance = axios.create({
  headers: { Accept: 'application/json' },
});

/**
 * Initializes the API token to be used for authentication before accessing any endpoints. Please see README for more details.
 * @param {String} apiToken Your API token for The One API
 * @example
 * initialize({ apiToken: 'your-api-token' });
 */
export const initialize = (apiToken: string) => {
  axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${apiToken}`;
};

/**
 * Checks if the API token has been initialized and if the user is authenticated.
 * @throws {Error} If the API token has not been initialized.
 */
const checkAuth = () => {
  console.log({ auth: axiosInstance.defaults.headers.common['Authorization'] });
  if (!axiosInstance.defaults.headers.common['Authorization']) {
    throw new Error(
      "You haven't initialized your token yet. Go to the README for more information on setup."
    );
  }
};

const handleError = (error: any) => {
  console.error(error);

  if (error.response) {
    console.error(`Error status code: ${error.response.status}`);
    console.error(`Error message: ${error.response.data.message}`);
  } else if (error.request) {
    console.error('Error: No response received from the server');
  } else {
    console.error('Error:', error.message);
  }
};

/**
 * Retrieves all movies.
 * @returns {Promise<Object>} A promise that resolves to an object containing the data for all movies.
 * @throws {Error} If authentication fails or an error occurs while retrieving the data.
 */
export const getAllMovies = async (): Promise<object> => {
  try {
    checkAuth();
    const response = await axiosInstance.get(`${API_URL}/movie`);
    return response.data;
  } catch (error) {
    handleError(error);
    throw new Error(`Failed to retrieve movies`);
  }
};

/**
 * getMovieById - Fetches the details of a movie by its id.
 *
 * @param {String} id - The id of the movie that is to be fetched
 * @returns {Promise} Resolves to an object containing the movie details
 */
export const getMovieById = async (id: string): Promise<object> => {
  try {
    checkAuth();
    const response = await axiosInstance.get(`${API_URL}/movie/${id}`);
    return response.data.docs[0];
  } catch (error) {
    handleError(error);
    throw new Error(`Failed to retrieve details for movie: ${id}`);
  }
};

/**
 * getQuotesByMovieId - Fetches quotes from a movie by movie id.
 * @param {String} id - The id of the movie that is to be fetched
 * @param {Number} [options.limit=10] - The number of results to return (defaults to 10)
 * @param {Number} [options.page=1] - The page number to return (defaults to 1)
 * @returns {Promise} Resolves to an object containing the movie details and additional information
 *                    about the number of results, the current page, etc.
 */
export const getQuotesByMovieId = async (
  id: string,
  options?: { limit?: number; page?: number }
): Promise<object> => {
  try {
    checkAuth();
    const response = await axiosInstance.get(
      `${API_URL}/movie/${id}/quote?limit=${options?.limit || 10}&page=${options?.page || 1}`
    );
    return response.data;
  } catch (error) {
    handleError(error);
    throw new Error(`Failed to retrieve quotes for movie: ${id}`);
  }
};

export default { initialize, getAllMovies, getMovieById, getQuotesByMovieId };
