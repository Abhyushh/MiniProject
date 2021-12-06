const express = require('express');
const userController = require('../controllers/user');

const router = express.Router();

router.get('/', userController.start);

router.get('/dashboard', userController.dashboard);

router.get('/playlist', userController.playlists);

module.exports = router;