const express = require('express');
const {
  getUsers,
  getUserById,
  updateProfile,
  updateProfileAvatar,
  getUserMe,
} = require('../controllers/users');
const { validateObjectId, validateUpdateProfile, validateUpdateAvatar } = require('../middleware/validation');

const usersRouter = express.Router();

usersRouter.get('/users', getUsers);

usersRouter.get('/users/me', getUserMe);

usersRouter.get('/users/:_id', validateObjectId, getUserById);

usersRouter.patch('/users/me', validateUpdateProfile, updateProfile);

usersRouter.patch('/users/me/avatar', validateUpdateAvatar, updateProfileAvatar);

module.exports = usersRouter;
