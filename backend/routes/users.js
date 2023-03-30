const express = require('express');
const {
  getUsers,
  getUserById,
  createUser,
  updateProfile,
  updateProfileAvatar,
} = require('../controllers/users');

const usersRouter = express.Router();

usersRouter.get('/users', getUsers);

usersRouter.get('/users/:id', getUserById);

usersRouter.post('/users', createUser);

usersRouter.patch('/users/me', updateProfile);

usersRouter.patch('/users/me/avatar', updateProfileAvatar);

module.exports = usersRouter;
