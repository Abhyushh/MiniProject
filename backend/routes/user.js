const express = require('express');
const userController = require('../controllers/user');

const router = express.Router();

router.get('/', userController.start);

router.get('/dashboard', userController.dashboard);

router.get('/search', userController.search);

router.post('/playlist', userController.postPlaylist);
module.exports = router;