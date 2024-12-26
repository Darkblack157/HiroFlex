const express = require('express');
const router = express.Router();
const videoDownloadController = require('../controllers/twitterDownload');

// Define a rota para download de vídeos do Twitter
router.get('/twitter/download', videoDownloadController.showTwitterVideoPreview);

module.exports = router;
