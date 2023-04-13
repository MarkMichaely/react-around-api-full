const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const {
  BADREQUEST,
} = require('../utils/errors');
const NotFoundError = require('../errors/not-found-error');
const BadRequestError = require('../errors/bad-request-error');

const { NODE_ENV, JWT_SECRET } = process.env;

const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(next);
};

const getUserMe = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(() => {
      throw new NotFoundError('No user found');
    })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'CastError') next(new BadRequestError('Invalid user id'));
      else next(err);
    });
};

const getUserById = (req, res, next) => {
  User.findById(req.params._id)
    .orFail(() => {
      throw new NotFoundError('No user found');
    })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'CastError') next(new BadRequestError('Invalid user id'));
      else next(err);
    });
};

const createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  User.findOne({ email })
    .then((user) => {
      if (user) {
        const err = new Error('conflict error');
        err.statusCode = 409;
        throw err;
      }
      return bcrypt.hash(password, 10);
    })
    .then((hash) => User.create({
      name, about, avatar, email, password: hash,
    }))
    .then(() => {
      res.status(201).send({ name, email });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') next(new BadRequestError('wrong data for user'));
      else next(err);
    });
};

const updateProfile = (req, res, next) => {
  const { name, about } = req.body;
  if (!name || !about) throw new BadRequestError('insuffiecnt data for change');
  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .orFail(() => {
      throw new NotFoundError('No user found');
    })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'CastError' || err.name === 'ValidationError') next(new BadRequestError('Invalid user id'));
      else next(err);
    });
};

const updateProfileAvatar = (req, res, next) => {
  const { avatar } = req.body;
  if (!avatar) res.status(BADREQUEST).send({ message: 'No link provided' });
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .orFail(() => {
      throw new NotFoundError('No user found');
    })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'CastError' || err.name === 'ValidationError') next(new BadRequestError('Invalid user id'));
      else next(err);
    });
};

const login = (req, res, next) => {
  const { password, email } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'not-so-secret-string',
        { expiresIn: '7d' },
      );

      res.send({ token });
    })
    .catch(next);
};

module.exports = {
  getUsers, getUserById, createUser, updateProfile, updateProfileAvatar, login, getUserMe,
};
