// server.cjs (Adicione o 'os' para lidar com caminhos, se necessário)
const express = require('express');
const path = require('path');
const fs = require('fs');
const cors = require('cors'); 

const app = express();
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || '127.0.0.1';
const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN || 'http://localhost:8080';
const videosDir = path.join(__dirname, '..', 'public', 'videos');

const isWithinDirectory = (directory, target) => {
    const relativePath = path.relative(directory, target);
    return relativePath !== '..' &&
        !relativePath.startsWith(`..${path.sep}`) &&
        !path.isAbsolute(relativePath);
};

// Configuração CORS (GLOBAL, mantemos)
app.use(cors({
    origin: ALLOWED_ORIGIN,
    methods: ['GET', 'HEAD', 'OPTIONS'],
    allowedHeaders: ['Range', 'Accept', 'Content-Type']
}));

// ********** NOVO BLOCO: SERVIÇO DE STREAMING MANUAL **********
// Esta rota lida com o streaming de MP4 explicitamente
app.get('/videos/*videoPath', (req, res) => {
    let videosRoot;
    try {
        videosRoot = fs.realpathSync(videosDir);
    } catch (error) {
        if (error.code === 'ENOENT' || error.code === 'ENOTDIR' || error.code === 'EACCES') {
            return res.status(404).send('404 Not Found');
        }
        throw error;
    }

    const videoPathParam = req.params.videoPath;
    const relativeVideoPath = Array.isArray(videoPathParam)
        ? path.join(...videoPathParam)
        : videoPathParam;
    if (typeof relativeVideoPath !== 'string') {
        return res.status(404).send('404 Not Found');
    }

    const requestedPath = path.resolve(videosRoot, relativeVideoPath);
    if (!isWithinDirectory(videosRoot, requestedPath)) {
        return res.status(404).send('404 Not Found');
    }

    let videoPath;
    let stat;
    try {
        videoPath = fs.realpathSync(requestedPath);
        if (!isWithinDirectory(videosRoot, videoPath)) {
            return res.status(404).send('404 Not Found');
        }
        stat = fs.statSync(videoPath);
    } catch (error) {
        if (error.code === 'ENOENT' || error.code === 'ENOTDIR' || error.code === 'EACCES') {
            return res.status(404).send('404 Not Found');
        }
        throw error;
    }

    if (!stat.isFile()) {
        return res.status(404).send('404 Not Found');
    }

    const fileSize = stat.size;
    const range = req.headers.range;

    if (range) {
        const match = /^bytes=(\d*)-(\d*)$/.exec(range);
        if (!match || (!match[1] && !match[2])) {
            return res.status(416).set({
                'Content-Range': `bytes */${fileSize}`
            }).end();
        }

        const start = match[1] ? Number(match[1]) : Math.max(0, fileSize - Number(match[2]));
        const end = match[2] && match[1] ? Number(match[2]) : fileSize - 1;
        if (
            !Number.isSafeInteger(start) ||
            !Number.isSafeInteger(end) ||
            start >= fileSize ||
            start > end ||
            end >= fileSize
        ) {
            res.status(416).set({
                'Content-Range': `bytes */${fileSize}`
            }).end();
            return;
        }

        const chunkSize = end - start + 1;
        const file = fs.createReadStream(videoPath, { start, end });
        const headers = {
            'Content-Range': `bytes ${start}-${end}/${fileSize}`,
            'Accept-Ranges': 'bytes',
            'Content-Length': chunkSize,
            'Content-Type': 'video/mp4', // FORÇANDO MP4
        };

        res.writeHead(206, headers); // 206 Partial Content é a chave
        file.on('error', error => {
            console.error('Falha ao transmitir vídeo:', error);
            res.destroy(error);
        });
        file.pipe(res);
    } else {
        const headers = {
            'Content-Length': fileSize,
            'Content-Type': 'video/mp4',
            'Accept-Ranges': 'bytes', // Garante que o cliente saiba que pode fazer Range Requests
        };
        res.writeHead(200, headers);
        const file = fs.createReadStream(videoPath);
        file.on('error', error => {
            console.error('Falha ao transmitir vídeo:', error);
            res.destroy(error);
        });
        file.pipe(res);
    }
});
// ********** FIM DO NOVO BLOCO **********

// Resto do seu código Express (Mantenha as rotas / e /videos-list inalteradas)
// ...
// lista recursiva para testes — Mantenha isso inalterado
// ...

app.get('/', (req, res) => res.send('Local video server running'));

app.listen(PORT, HOST, () => console.log(`Local server: http://${HOST}:${PORT}/videos (CORS=${ALLOWED_ORIGIN})`));