const express = require('express');
const cors = require('cors');
const path = require('path');
const youtubeRoutes = require('./routes/youtube');  // Importa as rotas do YouTube
const tiktokRoutes = require('./routes/tiktok');    // Importa as rotas do TikTok
const adultContentRoutes = require('./routes/adult'); // Importa a rota de conteúdo adulto
const videoRoutes = require('./routes/video18');  // Rota para vídeos adultos
const twitterRoutes = require('./routes/twitter');
const mediaLoli = require('./routes/loli'); // Importa a rota de conteúdo adulto

const app = express();

// Middleware
app.use(cors()); // Habilita o CORS para permitir requisições de diferentes origens
app.use(express.json()); // Substituindo bodyParser pelo express.json() para processar JSON

// Rotas
app.use('/youtube', youtubeRoutes);  // Roteia as requisições para o controlador de YouTube
app.use('/tiktok', tiktokRoutes);    // Roteia as requisições para o controlador de TikTok
app.use('/adult', adultContentRoutes); 
app.use('/videos', videoRoutes);  // Isso mapeia as rotas do video18 para a URL /videos
app.use('/api', twitterRoutes); // rota para twitter
app.use('/media', mediaLoli); // loli

// Serve arquivos estáticos da pasta 'public'
app.use(express.static(path.join(__dirname, '../public')));

// Rota para servir o arquivo HTML da documentação
app.get('/docs', (req, res) => {
    res.sendFile(path.join(__dirname, '../docs html/docs.html')); // Ajuste o caminho se necessário
});

// Middleware de tratamento de erros
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Ocorreu um erro interno.' });
});

// Middleware para tratamento de rotas não encontradas
app.use((req, res, next) => {
    res.status(404).json({ error: 'Rota não encontrada.' });
});

// Exporta a aplicação para uso externo (no arquivo server.js, por exemplo)
module.exports = app;
