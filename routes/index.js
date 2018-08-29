const express = require('express');
const bodyParser = require('body-parser');

const router = express.Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

router.get('/yes', (req, res) => {
    res.send('This also works pretty well');
});

// post a questions 

module.exports = router;