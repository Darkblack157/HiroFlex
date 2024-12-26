const express = require('express');
const router = express.Router();
const youtuberController = require('../controllers/youtubeController');
const youtubeControllerInfo = require('../controllers/youtubeControllerInfo');

// Rota para pegar as informações do vídeo
router.get('/info', async (req, res) => {
    try {
        // Passa a URL como parâmetro para o controlador que pega as informações
        await youtubeControllerInfo.getVideoInfo(req, res);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao obter as informações do vídeo.' });
    }
});

// Rota para download de vídeo/música
router.get('/download', async (req, res) => {
    try {
        // Passa a URL e o formato desejado para o controlador de download
        await youtuberController.download(req, res);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao baixar o vídeo ou áudio.' });
    }
});

module.exports = router;
