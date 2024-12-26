const express = require('express');
const router = express.Router();
const video18Controller = require('../controllers/video18adult');

// Rota para pesquisa de vídeos
router.get('/search', async (req, res) => {
    const { query } = req.query;  // Esperando o parâmetro de busca na query string

    if (!query) {
        return res.status(400).json({ error: 'Parâmetro de pesquisa "query" é obrigatório.' });
    }

    try {
        // Log para verificar o valor de "query"
        console.log('Buscando vídeos com a query:', query);

        const videos = await video18Controller.searchVideos(query);

        // Verificando se vídeos foram encontrados
        console.log('Vídeos encontrados:', videos);

        if (videos.length === 0) {
            return res.status(404).json({ message: 'Nenhum vídeo encontrado para a pesquisa.' });
        }

        // Retorna os vídeos encontrados como JSON
        res.json(videos);
    } catch (error) {
        console.error('Erro ao buscar vídeos:', error);
        res.status(500).json({ error: 'Ocorreu um erro ao buscar vídeos.' });
    }
});

module.exports = router;
