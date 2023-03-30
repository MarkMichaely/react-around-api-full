const express = require('express');
const {
  getUsers,
  getUserById,
  updateProfile,
  updateProfileAvatar,
  getUserMe,
} = require('../controllers/users');

const usersRouter = express.Router();

usersRouter.get('/users', getUsers);

usersRouter.get('/users/me', getUserMe);

usersRouter.get('/users/:id', getUserById);

usersRouter.patch('/users/me', updateProfile);

usersRouter.patch('/users/me/avatar', updateProfileAvatar);

module.exports = usersRouter;
