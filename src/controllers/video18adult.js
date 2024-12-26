const puppeteer = require('puppeteer');

exports.searchVideos = async (query) => {
    try {
        const browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();
        
        // Vai para a página de pesquisa do Pornhub
        await page.goto(`https://www.pornhub.com/video/search?search=${encodeURIComponent(query)}`, {
            waitUntil: 'domcontentloaded'
        });

        // Aguarda os vídeos carregarem na página
        await page.waitForSelector('.phimage a');

        // Extrai os vídeos
        const videos = await page.evaluate(() => {
            const results = [];
            const videoElements = document.querySelectorAll('.phimage a'); // Seletor correto para links
            videoElements.forEach(element => {
                const title = element.querySelector('img')?.getAttribute('alt') || null; // Título está no alt da imagem
                const url = element.getAttribute('href'); // Link do vídeo
                if (title && url) {
                    results.push({ 
                        title, 
                        url: `https://www.pornhub.com${url}` 
                    });
                }
            });
            return results;
        });

        await browser.close();

        return videos;
    } catch (error) {
        console.error('Erro ao buscar vídeos com Puppeteer:', error);
        throw new Error('Falha ao buscar vídeos.');
    }
};
