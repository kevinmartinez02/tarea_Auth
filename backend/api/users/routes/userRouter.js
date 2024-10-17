const userController = require('../controller/userController')
const express = require('express')
const router = express.Router();
const authToken = require('../../../middleware/authToken');

router.get('/get-user',authToken.verifyToken,userController.getUser);

module.exports = router