const express = require('express');
const app = express();
const router = require('./routes/index.js');

app.use('/', router);

const port = process.env.PORT || 3500;

// base application
app.get('/', (req, res) => {
    res.send('Welcome to trivia');
});

app.listen(port, () => {
    console.log(`App is listening on port ${port}`);
});