const ErrorMessage = {
  ENTITIES_NONE: 'Havent entity, check id pls.',
  ENTITIES_EMPTY: 'The list of entities is empty.',
  SERVER_PROCESS_ERR: 'Create process failed, try again.',
  SERVER_CLOSE_TO_CRASH: 'The server will crash soon !',
  SERVER_ERR: 'An error has occurred on the server, try again or check your query.',
  SERVER_ERR_INTERNAL: 'Sorry, Server Error. Please try again.',
  SERVER_BAD_REQUEST: 'Sorry, Bad Request. Please try again.',
  SERVER_PERMISSION_ERR: 'Sorry, No access rights.',
  SERVER_SUCCESS: 'Success operation.',
  SERVER_NO_SOURCE: 'Sorry, the source you are looking for cannot be found.',
  LOGIN_ERR: 'Invalid email name or password.',
  LOGIN_NO_ACCESS: 'Sorry, No access rights.',
  LOGIN_AUTH_ERR: 'Sorry, Authentication failed. Please try again.',
  LOGIN_USER_EXIST: 'Username already exists.',
};

module.exports = ErrorMessage;
