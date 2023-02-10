/**
 * Handles errors that occur during API requests.
 *
 * @param {any} error The error object to handle.
 *
 * @returns {Object} { status: number, message: string }
 *
 * @description
 * The function logs error messages to the console.
 * If the error has a `response` property, it logs the error status code and the error message received from the server.
 * If the error has a `request` property, it logs a message indicating that no response was received from the server.
 * If neither of these properties is present, it logs the error message.
 */
export const handleError = (error: any): { status: number; message: string } => {
  console.error(error);

  if (error.response) {
    console.error(`Error status code: ${error.response.status}`);
    console.error(`Error message: ${error.response.data.message}`);
    return { status: error.response.status, message: error.response.data.message };
  } else if (error.request) {
    console.error('Error: No response received from the server');
    return { status: 500, message: 'No response received from the server' };
  } else {
    return { status: 500, message: error.message };
  }
};
