const express = require('express');
const app = express();
const router = require('./routes/index.js');

app.use('/', router);

// base application
app.get('/', (req, res) => {
    res.send('Welcome to trivia');
});

const port = 3500;
app.listen(port, () => {
    console.log(`App is listening on port ${port}`);
});