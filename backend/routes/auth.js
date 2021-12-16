const express = require('express');
const authController = require('../controllers/auth');

const router = express.Router();

router.get("/login", authController.getLogin);

router.get('/callback', authController.loginGoogle);

router.get("/id", authController.getAccessToken);

module.exports = router;