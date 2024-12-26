const youtubedl = require('youtube-dl-exec');

exports.getVideoInfo = async (req, res) => {
    let { url } = req.query;

    if (!url) {
        return res.status(400).json({ error: 'URL do vídeo é obrigatória.' });
    }

    // Decodifica o URL caso ele tenha sido codificado (quando for passado com caracteres especiais)
    url = decodeURIComponent(url);

    try {
        const videoInfo = await youtubedl(url, {
            dumpSingleJson: true,
            noWarnings: true
        });

        const title = videoInfo.title;
        const duration = videoInfo.duration; // em segundos
        const description = videoInfo.description;
        const postedDate = videoInfo.uploadDate;
        const thumbnail = videoInfo.thumbnails[0]?.url || ''; // Thumbnail do vídeo

        // Converte a duração para minutos e segundos
        const minutes = Math.floor(duration / 60);
        const seconds = duration % 60;
        const formattedDuration = `${minutes}m ${seconds}s`;

        // Retorna as informações do vídeo
        res.json({
            title,
            duration: formattedDuration,
            description: description.substring(0, 200) + '...', // Pega apenas os primeiros 200 caracteres
            postedDate,
            thumbnail
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao obter as informações do vídeo.' });
    }
};
