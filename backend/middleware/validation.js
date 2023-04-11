const { Joi, celebrate, Segments } = require('celebrate');
const { isObjectIdOrHexString } = require('mongoose');
const isURL = require('validator/lib/isURL');

const validateURL = (value, helpers) => {
  if (isURL(value)) {
    return value;
  }
  return helpers.error('string.uri');
};

const validateMongooseObjectId = (value, helpers) => {
  if (isObjectIdOrHexString(value)) {
    return value;
  }
  return helpers.error('string.uri');
};
const validateLogin = celebrate({
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const validateSignup = celebrate({
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});
const validateObjectId = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    _id: Joi.string().custom(validateMongooseObjectId),
  }),
});

const validateCreateCard = celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().custom(validateURL),
  }),
});

const validateUpdateAvatar = celebrate({
  [Segments.BODY]: Joi.object().keys({
    avatar: Joi.string().required().custom(validateURL),
  }),
});
const validateUpdateProfile = celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
});
module.exports = {
  validateLogin,
  validateSignup,
  validateCreateCard,
  validateObjectId,
  validateUpdateAvatar,
  validateUpdateProfile,
};
