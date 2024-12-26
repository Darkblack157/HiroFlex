const express = require('express');
const { default: TikTokScraper } = require('tiktok-scraper');
const ytdl = require('@distube/ytdl-core'); // Mudança aqui

const app = express();
const PORT = 3000;

// Rota para download de vídeo do YouTube
app.get('/download/youtube', async (req, res) => {
    const { url } = req.query;
    if (!url) {
        return res.status(400).send('URL do vídeo é obrigatória.');
    }

    try {
        res.header('Content-Disposition', 'attachment; filename="video.mp4"');
        ytdl(url, { quality: 'highestvideo' }).pipe(res);
    } catch (error) {
        res.status(500).send('Erro ao baixar o vídeo: ' + error.message);
    }
});

// Rota para download de vídeo do TikTok
app.get('/download/tiktok', async (req, res) => {
    const { url } = req.query;
    if (!url) {
        return res.status(400).send('URL do vídeo é obrigatória.');
    }

    try {
        const videoMeta = await TikTokScraper.getVideoMeta(url);
        const videoUrl = videoMeta.videoUrl;
        res.header('Content-Disposition', 'attachment; filename="tiktok_video.mp4"');
        const response = await fetch(videoUrl);
        const videoStream = response.body;
        videoStream.pipe(res);
    } catch (error) {
        res.status(500).send('Erro ao baixar o vídeo: ' + error.message);
    }
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
