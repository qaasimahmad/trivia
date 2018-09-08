const express = require('express');
const bodyParser = require('body-parser');
const triviaModel = require('../models/trivia');
const { mongoose } = require('../config/config');
const Response = require('../response/response');

const router = express.Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

// post a question

router.post('/trivia', (req, res) => {
    console.log('body', req.body);
    if (Object.keys(req.body).length === 0) {
        const reject = new Response(400, 'The payload body is empty', res, true, [])
        return reject.res_message();
    }

    const { question, category, answer, hint, difficulty, options} = req.body;
    if (!question || !category || !answer || !options){
        const incomplete_data = new Response(400, 'Kindly provide all of these- question, category, answer and options', res, true, [])
        return incomplete_data.res_message();  
    }
    const data = {
        question,
        answer,
        category,
        hint,
        difficulty,
        options
    };
    return triviaModel.create(data)
        .then(() => {
            const savedData = new Response(200, 'Question saved successfully', res, false, []);
            return savedData.res_message();
        })
        .catch((err) => {
            console.log('Error from saving questions', err);
            const unsavedData = new Response(404, 'Unable to save questions', res, true, []);
            return unsavedData.res_message();
        })
})

// Get questions based on category
router.get('/trivia/:category', (req, res) => {
    let category = req.params;
    category = category.category

    triviaModel.findByCategory(category)
        .then((data) => {
            const gottenData = new Response(200, 'Questions gotten succesfully', res, false, data);
            return gottenData.res_message();
        })
        .catch(() => {
            const errorGettingData = new Response(404, 'Unable to get Questions', res, true, []);
            return errorGettingData.res_message();
        })
    console.log('category', category);
})

module.exports = router;