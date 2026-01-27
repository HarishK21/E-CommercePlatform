const express = require('express');
const app = express();
const path = require('path');

const PORT = 8080;

app.use('/', express.static(path.join(__dirname, 'public')));

console.log("__dirname: " + __dirname);

app.get('/', (req, res) => { 
    res.sendFile(path.join(__dirname, 'views/index.html'));
});

app.get('/info', (req, res) => {
    res.send("<h1>This is the info page</h1>");   
});

app.listen(PORT, () => { console.log("Server has started on port " + PORT); });