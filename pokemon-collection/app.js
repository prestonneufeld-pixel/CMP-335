const express = require('express');
const app = express();

app.use(express.json());

// Pokemon collection
const pokemon = [
    { id: 1, name: 'charmander', type: 'fire', evolution: 'base' },
    { id: 2, name: 'squirtle', type: 'water', evolution: 'base' },
    { id: 3, name: 'pikachu', type: 'electric', evolution: 'base' }
];

// Show the website
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// GET: All Pokemon
app.get('/api/pokemon', (req, res) => {
    res.send(pokemon);
});

// GET: One Pokemon
app.get('/api/pokemon/:id', (req, res) => {
    const p = pokemon.find(p => p.id === parseInt(req.params.id));

    if (!p) {
        return res.status(404).send('Pokemon not found.');
    }

    res.send(p);
});

// POST: Add a Pokemon
app.post('/api/pokemon', (req, res) => {
    if (!req.body.name || !req.body.type || !req.body.evolution) {
        return res.status(400).send('Please fill out all fields.');
    }

    const p = {
        id: pokemon.length > 0 ? Math.max(...pokemon.map(p => p.id)) + 1 : 1,
        name: req.body.name,
        type: req.body.type,
        evolution: req.body.evolution
    };

    pokemon.push(p);
    res.status(201).send(p);
});

// PUT: Update a Pokemon
app.put('/api/pokemon/:id', (req, res) => {
    const p = pokemon.find(p => p.id === parseInt(req.params.id));

    if (!p) {
        return res.status(404).send('Pokemon not found.');
    }

    if (!req.body.name || !req.body.type || !req.body.evolution) {
        return res.status(400).send('Please fill out all fields.');
    }

    p.name = req.body.name;
    p.type = req.body.type;
    p.evolution = req.body.evolution;

    res.send(p);
});

// DELETE: Remove a Pokemon
app.delete('/api/pokemon/:id', (req, res) => {
    const p = pokemon.find(p => p.id === parseInt(req.params.id));

    if (!p) {
        return res.status(404).send('Pokemon not found.');
    }

    const index = pokemon.indexOf(p);
    pokemon.splice(index, 1);
    res.send(p);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
