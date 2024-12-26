const { exec } = require('child_process');
const path = require('path');

exports.download = async (req, res) => {
    const { url, format } = req.query;

    // Valida se a URL foi fornecida
    if (!url) {
        return res.status(400).json({ error: 'A URL do vídeo é obrigatória.' });
    }

    try {
        // Valida o formato
        const validFormats = ['mp3', 'mp4'];
        if (format && !validFormats.includes(format)) {
            return res.status(400).json({ error: 'Formato inválido. Use "mp3" ou "mp4".' });
        }

        // Caminho completo para o executável do yt-dlp (verifique o caminho)
        const ytDlpPath = path.resolve('C:\\yt-dlp\\yt-dlp.exe');  // Ajuste o caminho conforme necessário

        // Diretório temporário e arquivo de saída
        const tempDir = process.env.TEMP || 'C:\\temp'; // Diretório temporário
        const outputFile = path.join(tempDir, `output.${format === 'mp3' ? 'mp3' : 'mp4'}`);

        // Comando para o yt-dlp (mp3 ou mp4)
        const command = `"${ytDlpPath}" -f ${format === 'mp3' ? 'bestaudio' : 'best'} -o "${outputFile}" ${url}`;

        // Executa o comando
        exec(command, (error, stdout, stderr) => {
            if (error) {
                console.error(`Erro ao executar o yt-dlp: ${error.message}`);
                return res.status(500).json({ error: 'Erro ao baixar o vídeo.' });
            }

            if (stderr) {
                console.error(`yt-dlp error output: ${stderr}`);
                return res.status(500).json({ error: 'Erro ao baixar o vídeo.' });
            }

            console.log(`yt-dlp output: ${stdout}`);

            // Verifique se o arquivo foi baixado corretamente
            if (!outputFile || !path.existsSync(outputFile)) {
                return res.status(500).json({ error: 'Falha ao salvar o arquivo.' });
            }

            // Envia o arquivo para o cliente
            res.download(outputFile, `video.${format === 'mp3' ? 'mp3' : 'mp4'}`, (err) => {
                if (err) {
                    console.error(`Erro ao enviar o arquivo: ${err.message}`);
                    return res.status(500).json({ error: 'Erro ao enviar o arquivo.' });
                }

                // Após o envio, pode excluir o arquivo temporário
                // fs.unlink(outputFile, (err) => {
                //     if (err) {
                //         console.error('Erro ao excluir o arquivo temporário', err);
                //     }
                // });
            });
        });
    } catch (error) {
        console.error('Erro inesperado:', error);
        res.status(500).json({ error: error.message });
    }
};
