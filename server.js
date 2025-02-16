const express = require('express');
const path = require('path');

const app = express();

const PORT = process.env.PORT;
const APP_URL = process.env.APP_URL;
const DEFAULT_BANG = process.env.DEFAULT_BANG || "ddg"


const publicPath = path.join(__dirname, 'index.html');

app.use(express.static(path.join(__dirname, 'dist')));


app.get('/', (req, res) => {res.sendFile(publicPath)});
app.get('/src/main.js', (req, res) => {res.sendFile(path.join(__dirname, 'src', 'main.js'))});
app.get('/src/bang.js', (req, res) => {res.sendFile(path.join(__dirname, 'src', 'bang.js'))});
app.get('/src/global.css', (req, res) => {res.sendFile(path.join(__dirname, 'src', 'global.css'))});
app.get('/public/search.svg', (req, res) => {res.sendFile(path.join(__dirname, 'public', 'search.svg'))});

app.get('/config', (req, res) => {
    res.json({ appUrl: APP_URL, defaultBang: DEFAULT_BANG });
});

app.listen(PORT, () => console.log(`Server running on ${APP_URL}`));
