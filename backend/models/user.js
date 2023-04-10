const mongoose = require('mongoose');
const isEmail = require('validator/lib/isEmail');
const bcrypt = require('bcryptjs');
const UnathorizedError = require('../errors/unauthrized-err');

const userSchema = mongoose.Schema({
  name: {
    type: String,
    default: 'Jacques Cousteau',
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    default: 'Explorer',
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    default: 'https://practicum-content.s3.us-west-1.amazonaws.com/resources/moved_avatar_1604080799.jpg',
    validate: {
      validator(v) {
        return /^(http[s]?:\/\/[www]?)[a-zA-Z0-9-._~:/?%#[\]@!$&'()*+,;=]+\.[a-zA-Z]+\/?[a-zA-Z0-9-._~:/?%#[\]@!$&'()*+,;=]*$/i.test(v);
      },
      message: (props) => `${props.value} is not a valid URL`,
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (v) => isEmail(v),
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(UnathorizedError('incorrect email or password'));
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(UnathorizedError('incorrect email or password'));
          }
          return user;
        });
    });
};
module.exports = mongoose.model('user', userSchema);
