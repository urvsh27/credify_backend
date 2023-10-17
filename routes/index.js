// Import modules
const express = require('express');

// Import controllers
const usersController = require('../controllers/usersController');
const authController = require('../middlewares/auth');
// Import files
const validator = require('../middlewares/validator');
// Router object
const router = express.Router();

/*
* Authentication routes
*/
// Register route
router.post('/register', validator('register'), usersController.register);
// Login route
router.post('/login', validator('login'), usersController.login);
// Admin login route
router.post('/admin-login', validator('login'), usersController.adminLogin);

// Dashboard
router.get('/user-auth', authController.jwtUserAuthValidate, usersController.dashboard);
// Dashboard
router.get('/admin-auth', authController.jwtAdminAuthValidate, usersController.dashboard);

module.exports = router;
