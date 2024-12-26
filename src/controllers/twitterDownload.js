const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

exports.showTwitterVideoPreview = async (req, res) => {
    const url = req.query.url;

    if (!url) {
        return res.status(400).json({ error: 'URL é obrigatória.' });
    }

    try {
        const videoPath = path.join(__dirname, '../downloads/video.mp4'); // Caminho temporário do arquivo salvo
        const command = `yt-dlp -o "${videoPath}" ${url}`; // Comando para baixar o vídeo

        // Executa o comando para baixar o vídeo
        exec(command, (error, stdout, stderr) => {
            if (error) {
                console.error('Erro ao baixar o vídeo:', error);
                return res.status(500).json({ error: 'Erro ao processar o download.' });
            }

            // Envia o vídeo baixado como resposta
            res.setHeader('Content-Type', 'video/mp4');
            res.sendFile(videoPath, (err) => {
                if (err) {
                    console.error('Erro ao enviar o arquivo:', err);
                }

                // Apaga o arquivo após o envio
                fs.unlink(videoPath, (unlinkErr) => {
                    if (unlinkErr) console.error('Erro ao apagar o arquivo:', unlinkErr);
                });
            });
        });
    } catch (error) {
        console.error('Erro geral:', error);
        res.status(500).json({ error: 'Erro ao processar o pedido.' });
    }
};
