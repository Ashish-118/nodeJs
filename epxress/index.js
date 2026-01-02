const express = require('express');
const http = require('http');

const app = express();

app.get('/', (req, res) => {
    res.send('homepage');
});

app.get('/about', (req, res) => {
    const name = req.query.name || 'Ashish';
    res.send(`My name is ${name}`);
});


// const server = http.createServer(app);

// const PORT = 3000;
// server.listen(PORT, () => {
//     console.log(`Server is running on http://localhost:${PORT}`);
// });

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});