// server.cjs (Adicione o 'os' para lidar com caminhos, se necessário)
const express = require('express');
const path = require('path');
const fs = require('fs');
const cors = require('cors'); 

const app = express();
const PORT = process.env.PORT || 3000;
const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN || '*';
const videosDir = path.join(__dirname, '..', 'public', 'videos');

// Configuração CORS (GLOBAL, mantemos)
app.use(cors({
    origin: ALLOWED_ORIGIN,
    methods: ['GET', 'HEAD', 'OPTIONS'],
    allowedHeaders: ['Range', 'Accept', 'Content-Type']
}));

// ********** NOVO BLOCO: SERVIÇO DE STREAMING MANUAL **********
// Esta rota lida com o streaming de MP4 explicitamente
app.get('/videos/*', (req, res) => {
    // 1. Constrói o caminho completo do arquivo a partir da URL
    const videoPath = path.join(videosDir, req.params[0]); 
    
    // 2. Verifica se o arquivo existe
    if (!fs.existsSync(videoPath)) {
        console.error(`Arquivo não encontrado: ${videoPath}`);
        return res.status(404).send('404 Not Found');
    }
    
    const stat = fs.statSync(videoPath);
    const fileSize = stat.size;
    const range = req.headers.range;

    // 3. Lógica de Range Request (Streaming)
    if (range) {
        const parts = range.replace(/bytes=/, "").split("-");
        const start = parseInt(parts[0], 10);
        const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;

        if (start >= fileSize || end >= fileSize) {
            res.status(416).set({
                'Content-Range': `bytes */${fileSize}`
            }).end();
            return;
        }

        const chunkSize = (end - start) + 1;
        const file = fs.createReadStream(videoPath, { start, end });
        const headers = {
            'Content-Range': `bytes ${start}-${end}/${fileSize}`,
            'Accept-Ranges': 'bytes',
            'Content-Length': chunkSize,
            'Content-Type': 'video/mp4', // FORÇANDO MP4
        };

        res.writeHead(206, headers); // 206 Partial Content é a chave
        file.pipe(res);
    } else {
        // 4. Lógica de requisição completa (se não for streaming)
        const headers = {
            'Content-Length': fileSize,
            'Content-Type': 'video/mp4',
            'Accept-Ranges': 'bytes', // Garante que o cliente saiba que pode fazer Range Requests
        };
        res.writeHead(200, headers);
        fs.createReadStream(videoPath).pipe(res);
    }
});
// ********** FIM DO NOVO BLOCO **********

// Resto do seu código Express (Mantenha as rotas / e /videos-list inalteradas)
// ...
// lista recursiva para testes — Mantenha isso inalterado
// ...

app.get('/', (req, res) => res.send('Local video server running'));

app.listen(PORT, () => console.log(`Local server: http://localhost:${PORT}/videos (CORS=${ALLOWED_ORIGIN})`));