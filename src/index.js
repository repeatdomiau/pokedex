const express = require('express');
const fs = require('fs');

const app = express();

app.use(express.static('public'));

app.get('/api/pokemons', (_, res) => {

    fs.readFile('data/pokemons.json', (err, data) => {

        if (err) {
            console.error(err);
            res.statusCode = 500;
            return res.end("houve um erro inesperado...");
        }
        else {
            res.statusCode = 200;
            return res.end(data);
        }

    });

});

app.listen('8080', () => console.info('listening on http://localhost:8080'));