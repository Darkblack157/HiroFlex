const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');

exports.download = async (req, res) => {
    const { url } = req.query;

    if (!url) {
        return res.status(400).json({ error: 'A URL do vídeo é obrigatória.' });
    }

    try {
        const outputFile = path.join(__dirname, 'output.mp4');
        const command = `yt-dlp -o "${outputFile}" ${url}`;

        exec(command, (error, stdout, stderr) => {
            if (error) {
                console.error('Erro ao executar yt-dlp:', error);
                return res.status(500).json({ error: 'Erro ao processar o download do vídeo.' });
            }

            console.log('yt-dlp output:', stdout);

            if (fs.existsSync(outputFile)) {
                res.setHeader('Content-Disposition', 'attachment; filename="tiktok-video.mp4"');
                res.sendFile(outputFile, () => {
                    fs.unlinkSync(outputFile); // Remove o arquivo após o envio
                });
            } else {
                res.status(500).json({ error: 'O vídeo não foi baixado corretamente.' });
            }
        });
    } catch (error) {
        console.error('Erro ao baixar o vídeo:', error.message);
        res.status(500).json({ error: 'Erro ao processar o download do vídeo.' });
    }
};
