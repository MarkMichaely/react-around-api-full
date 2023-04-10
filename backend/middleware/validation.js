const { Joi, celebrate, Segments } = require('celebrate');
const isURL = require('validator/lib/isURL');
const validateURL = (value, helpers) => {
  if (isURL(value)) {
    return value;
  }
  return helpers.error('string.uri');
}
const validateLogin = celebrate({
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  })
});

const validateSignup = celebrate({
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  })
});

module.exports = {
  validateLogin, validateSignup
}