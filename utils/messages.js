const generalMessages = {
  dbConnectionSuccess : 'Postgresql connected successfully.',
  dbConnectionFail : 'Unable to connect to the database.',
  dbSyncSuccess : 'Database synced.',
  welcomeMessage : 'Welcome to the credify app',
  jwtTokenRequired : 'Authorization token required.',
  jwtTokenExpired : 'JWT token expired.',
  unableToVerifyJwtToken : 'Unable to verify jwt token.',
};

const userMessages = {
  userRegisterSuccess: 'User registered successfully.',
  userRegisterFail: 'User registration failed, please try again later.',
  userAlreadyExists: 'User already exists with this email address.',
  userNotFound : 'User not found with this email address.',
  userLoginSuccess : 'User login successfully.',
  userLoginFailure : 'User login failed, please check email and password.',
  usersListFound : 'Users list found successfully',
};

const roleMessages = {
  rolesNotFound : 'Roles not found.',
  rolesFound : 'Roles found successfully.'
};

const userRolesMessages = {
  userRolesNotFound : 'User roles not found.',
  userRolesFound : 'User roles found successfully.',
  noAccess : 'You don\'t have access to exceed further, Contact administrator for access.',
  noUserAccess : 'You don\'t have user access.',
  noAdminAccess : 'You don\'t have admin access.',
}

module.exports = {
  generalMessages,
  userMessages,
  roleMessages,
  userRolesMessages,
};
