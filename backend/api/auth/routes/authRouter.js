const authController = require('../controller/authController')
const express = require('express');
const router = express.Router();    
const validateInput = require('../validator/validateInput');
const middleware = require('../middleware/auth');
const authMiddleware = require('../../../middleware/authToken')
router.post('/register',
    [
        validateInput.validateInput(),
        middleware.verifyUserName,
        middleware.verifyEmail,
        middleware.hashPassword
    ],
     authController.signUp);
router.post('/login',middleware.verifyPasswordUserName,authController.signIn);
router.post('/logout',authMiddleware.verifyToken,authController.logout);
module.exports = router;
