const mongoose = require('mongoose');
const { urlRegex } = require('../utils/regex');

const cardSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Card name required'],
    minlength: 2,
    maxlength: 30,
  },
  link: {
    type: String,
    required: [true, 'Picture required'],
    validate: {
      validator(v) {
        return urlRegex.test(v);
      },
      message: (props) => `${props.value} is not a valid URL`,
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, 'User required'],
    ref: 'user',
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  }],
  createdAt: {
    type: Date,
    default: Date.now(),
  },

});

module.exports = mongoose.model('card', cardSchema);
