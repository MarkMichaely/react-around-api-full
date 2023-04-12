require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const { errors } = require('celebrate');
const cors = require('cors');
const cardsRouter = require('./routes/cards');
const usersRouter = require('./routes/users');
const { SERVERERROR } = require('./utils/errors');
const { login, createUser } = require('./controllers/users');
const auth = require('./middleware/auth');
const NotFoundError = require('./errors/not-found-error');
const { validateLogin, validateSignup } = require('./middleware/validation');
const { requestLogger, errorLogger } = require('./middleware/logger');

const app = express();

const { PORT = 3001 } = process.env;

app.use(helmet());
const jsonParser = bodyParser.json();

mongoose.connect('mongodb://localhost:27017/aroundb');
app.use(cors());
app.options('*', cors());
app.use(jsonParser);
app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Server will crash now');
  }, 0);
});

app.post('/signin', validateLogin, login);
app.post('/signup', validateSignup, createUser);
app.use(auth);
app.use('/', usersRouter);

app.use('/', cardsRouter);

app.use('*', () => {
  throw new NotFoundError('Requested resource not found');
});
app.use(errorLogger);
app.use(errors());
app.use((err, req, res, next) => {
  const { statusCode = SERVERERROR, message } = err;
  res
    .status(statusCode)
    .send({
      message: statusCode === SERVERERROR
        ? 'An error occurred on the server'
        : message,
    });
});
app.listen(PORT, () => {
  console.log(`app listening on port ${PORT}`);
});
