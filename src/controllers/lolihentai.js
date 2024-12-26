const axios = require('axios'); // Usando axios para fazer requisições HTTP
const xml2js = require('xml2js'); // Para converter XML em JSON

// Credenciais fixas do Gelbooru
const userId1 = '945005'; // Substitua pelo seu ID de usuário
const apiKey1 = '158f888de14a28584c457785dde03ad20aabe5efe4ae9873d2b0622fed0afc8a'; // Substitua pela sua API key

// Extensões de mídia suportadas
const IMAGE_EXTENSIONS = ['jpg', 'jpeg', 'png', 'gif'];
const VIDEO_EXTENSIONS = ['mp4', 'webm'];

exports.getMedia = async (req, res) => {
    const { userPermission } = req.query;

    // Verifica permissões
    if (userPermission !== 'true') {
        return res.status(403).json({ error: 'Você não tem permissão para acessar este conteúdo.' });
    }

    try {
        const pid = Math.floor(Math.random() * 10) + 1; // Página aleatória para mais variedade
        const response = await axios.get(
            `https://gelbooru.com/index.php?page=dapi&s=post&q=index&tags=loli&pid=${pid}&api_key=${apiKey1}&user_id=${userId1}`
        );

        // Converte a resposta de XML para JSON
        const parser = new xml2js.Parser();
        const result = await parser.parseStringPromise(response.data);

        // Busca os posts retornados
        const posts = result.posts?.post;

        if (!posts || posts.length === 0) {
            return res.status(404).json({ error: 'Nenhuma mídia encontrada para a tag especificada.' });
        }

        const mediaUrl = posts[0].file_url[0]; // Pega o link da mídia
        const mediaType = mediaUrl.split('.').pop().toLowerCase(); // Verifica a extensão do arquivo

        // Determina o tipo de mídia e retorna de acordo
        if (VIDEO_EXTENSIONS.includes(mediaType)) {
            res.json({ type: 'video', url: mediaUrl }); // Retorna o vídeo
        } else if (IMAGE_EXTENSIONS.includes(mediaType)) {
            res.json({ type: 'image', url: mediaUrl }); // Retorna a imagem
        } else {
            res.status(400).json({ error: 'Tipo de mídia não suportado.' });
        }
    } catch (error) {
        console.error('Erro ao buscar a mídia do Gelbooru:', error.message);
        res.status(500).json({ error: 'Erro ao buscar a mídia. Tente novamente mais tarde.' });
    }
};
