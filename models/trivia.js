const mongoose = require('mongoose');
const moment = require('moment');
const { Schema } = mongoose;

const triviaSchema = new Schema({
  question: {
    type: String,
    required: true,
    unique: true
  },
  category: {
    type: String,
    required: true
  },
  answer: {
    type: [String],
    required: false,
    default: []
  },
  hint: {
    type: String,
    default: ''
  },
  // changed to an Array from an Object
  options: {
    type: [String],
    required: false,
    default: []
  },
  difficulty: {
    type: String,
    default: 'EASY',
    enum: ['EASY', 'NORMAL', 'HARD']
  },
  createdAt: {
    type: Date,
    default: moment()
  },
  updatedAt: {
    type: Date,
    default: moment(),
    select: false
  }
});

triviaSchema.static('findByCategory', function(category, callback) {
  console.log('i got here');
  return this.find({ category }, callback);
});

const triviaModel = mongoose.model('trivia', triviaSchema);
module.exports = triviaModel;