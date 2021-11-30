const express = require('express');
const userController = require('../controllers/user');

const router = express.Router();

router.get('/', userController.dashboard)

router.get('/playlist', userController.playlists);

module.exports = router;