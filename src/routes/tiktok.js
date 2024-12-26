const express = require('express');
const router = express.Router();
const tiktokController = require('../controllers/tiktokController');

// Rota para baixar vídeo do TikTok
router.get('/download', tiktokController.download);

module.exports = router;
