// Import modules
const express = require('express');

// Import controllers
const usersController = require('../controllers/usersController');
const authController = require('../middlewares/auth');
// Import files
const validator = require('../middlewares/validator');
const { creditCardController } = require('../controllers');
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
// Add card
router.post('/add-card', authController.jwtUserAuthValidate, creditCardController.addCreditCard);
// Get all user cards
router.get('/cards', authController.jwtUserAuthValidate, creditCardController.getUserCreditCards);
// Get all users list
router.get('/all-users', authController.jwtAdminAuthValidate, usersController.getAllUsers);

module.exports = router;
