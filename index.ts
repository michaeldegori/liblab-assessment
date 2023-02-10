import axios from 'axios';
import axiosRetry from 'axios-retry';
import { handleError } from './utils/handleError';

const API_URL: string = 'https://the-one-api.dev/v2';

const axiosInstance = axios.create({
  headers: { Accept: 'application/json' },
});
axiosRetry(axiosInstance, { retries: 3 });

/**
 * Initializes the API token to be used for authentication before accessing any endpoints. Please see README for more details.
 * @param {String} apiToken Your API token for The One API
 * @example
 * initialize('your-api-token');
 */
export const initialize = (apiToken: string) => {
  axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${apiToken}`;
};

/**
 * Checks if the API token has been initialized and if the user is authenticated.
 * @throws {Error} If the API token has not been initialized.
 */
const checkAuth = () => {
  if (!axiosInstance.defaults.headers.common['Authorization']) {
    throw new Error(
      "You haven't initialized your token yet. Go to the README for more information on setup."
    );
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
    return handleError(error);
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
    return handleError(error);
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
    return handleError(error);
  }
};

export default { initialize, getAllMovies, getMovieById, getQuotesByMovieId };
