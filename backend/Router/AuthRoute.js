const express = require('express');
const router = express.Router(); // Correctly initialize the router

// Import functions from other modules (ensure these paths and names match your project)
const { signup, login } = require('../Controller/AuthController');
const { signupValidation, loginValidation } = require('../Middleware/AuthValidation');




router.post('/login', loginValidation, login);
router.post('/signup', signupValidation, signup);

module.exports = router;

