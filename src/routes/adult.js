const express = require('express');
const router = express.Router();
const adultController = require('../controllers/adultContentController');

// Rota para pegar uma mídia aleatória de conteúdo adulto (imagem ou vídeo)
router.get('/media', adultController.getMedia);

module.exports = router;