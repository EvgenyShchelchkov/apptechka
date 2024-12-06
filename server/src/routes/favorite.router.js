const express = require('express');
const { getFavorites } = require('../controllers/favoriteController');
const router = express.Router();

// Получить все избранные лекарства
router.get('/favorites', getFavorites);

module.exports = router;
