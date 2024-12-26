const express = require('express');
const router = express.Router();
const adultController = require('../controllers/lolihentai');

// Rota para pegar uma mídia aleatória de conteúdo adulto (imagem ou vídeo)
router.get('/loli', adultController.getMedia);

module.exports = router;
