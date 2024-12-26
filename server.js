require('dotenv').config();
const express = require('express');
const app = require('./src/app');
const ngrok = require('ngrok'); // Adiciona o Ngrok

const PORT = process.env.PORT || 4000;

// Função para inicializar o servidor com Ngrok
(async function () {
    try {
        app.listen(PORT, async () => {
            console.log(`API rodando em http://localhost:${PORT}`);

            // Inicia o túnel do Ngrok
            const ngrokUrl = await ngrok.connect({
                authtoken: process.env.NGROK_AUTHTOKEN, // Token do Ngrok
                addr: PORT, // Porta do servidor local
                region: 'us', // Região (us, eu, ap, etc.)
            });

            console.log(`Túnel Ngrok ativo: ${ngrokUrl}`);
        });
    } catch (err) {
        console.error('Erro ao iniciar o Ngrok:', err);
    }
})();
