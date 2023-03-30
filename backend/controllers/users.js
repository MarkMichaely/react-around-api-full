const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { BADREQUEST, NOTFOUND, SERVERERROR, UNATHORIZED } = require('../utils/errors');
const user = require('../models/user');
const { NODE_ENV, JWT_SECRET } = process.env;

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(() => res.status(SERVERERROR).send({ message: 'An error has occured on the server' }));
};

const getUserMe = (req, res) => {
  User.findById(req.user._id)
    .orFail(() => {
      const error = new Error('user not found');
      error.statusCode = NOTFOUND;
      throw error;
    })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(BADREQUEST).send({ message: 'Invalid user id' });
      } else if (err.statusCode === NOTFOUND) {
        res.status(NOTFOUND).send({ message: err.message });
      } else res.status(SERVERERROR).send({ message: 'An error has occured on the server' });
    });
};

const getUserById = (req, res) => {
  User.findById(req.params.id)
    .orFail(() => {
      const error = new Error('user not found');
      error.statusCode = NOTFOUND;
      throw error;
    })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(BADREQUEST).send({ message: 'Invalid user id' });
      } else if (err.statusCode === NOTFOUND) {
        res.status(NOTFOUND).send({ message: err.message });
      } else res.status(SERVERERROR).send({ message: 'An error has occured on the server' });
    });
};

const createUser = (req, res) => {
  const { name, about, avatar, email, password } = req.body;
  bcrypt.hash(password, 10).then((hash) =>
    User.create({ name, about, avatar, email, password }))
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') res.status(BADREQUEST).send({ message: 'Wrong data for user' });
      res.status(SERVERERROR).send({ message: 'An error has occured on the server' });
    });
};

const updateProfile = (req, res) => {
  const { name, about } = req.body;
  if (!name || !about) res.status(BADREQUEST).send({ message: 'insuffiecnt data for change' });
  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .orFail(() => {
      const error = new Error('user not found');
      error.statusCode = NOTFOUND;
      throw error;
    })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(BADREQUEST).send({ message: 'Invalid user id' });
      } else if (err.name === 'ValidationError') {
        res.status(BADREQUEST).send({ message: 'Invalid user id' });
      } else if (err.statusCode === NOTFOUND) {
        res.status(NOTFOUND).send({ message: err.message });
      } else res.status(SERVERERROR).send({ message: 'An error has occured on the server' });
    });
};

const updateProfileAvatar = (req, res) => {
  const { avatar } = req.body;
  if (!avatar) res.status(BADREQUEST).send({ message: 'No link provided' });
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .orFail(() => {
      const error = new Error('user not found');
      error.statusCode = NOTFOUND;
      throw error;
    })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(BADREQUEST).send({ message: 'Invalid user id' });
      } else if (err.name === 'ValidationError') {
        res.status(BADREQUEST).send({ message: 'Invalid user id' });
      } else if (err.statusCode === NOTFOUND) {
        res.status(NOTFOUND).send({ message: err.message });
      } else res.status(SERVERERROR).send({ message: 'An error has occured on the server' });
    });
};

const login = (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        const err = new Error("incorrect email or password");
        err.statusCode = UNATHORIZED;
        return Promise.reject(err);
      }
      return bcrypt.compare(password, user.password);
    })
    .then((matched) => {
      if (!matched) {
        const err = new Error("incorrect email or password");
        err.statusCode = UNATHORIZED;
        return Promise.reject(err);
      }
      const token = jwt.sign({ _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'not-so-secret-string',
        { expiresIn: '7d' });
      res.send(token);
    })
    .catch((err) => {
      if (err.statusCode === UNATHORIZED) res.status(UNATHORIZED).send({ message: err.message });
    })
}

module.exports = {
  getUsers, getUserById, createUser, updateProfile, updateProfileAvatar, login, getUserMe
};
