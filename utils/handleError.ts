/**
 * Handles errors that occur during API requests.
 *
 * @param {any} error - The error object to handle.
 *
 * @returns {void}
 *
 * @description
 * The function logs error messages to the console.
 * If the error has a `response` property, it logs the error status code and the error message received from the server.
 * If the error has a `request` property, it logs a message indicating that no response was received from the server.
 * If neither of these properties is present, it logs the error message.
 */
export const handleError = (error: any) => {
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
