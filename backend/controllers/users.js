const User = require('../models/user');
const bcrypt = require('bcryptjs');
const { BADREQUEST, NOTFOUND, SERVERERROR } = require('../utils/errors');

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(() => res.status(SERVERERROR).send({ message: 'An error has occured on the server' }));
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
module.exports = {
  getUsers, getUserById, createUser, updateProfile, updateProfileAvatar,
};
