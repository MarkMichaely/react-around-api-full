const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cardsRouter = require('./routes/cards');
const usersRouter = require('./routes/users');
const { SERVERERROR } = require('./utils/errors');
const { login, createUser } = require('./controllers/users');
const auth = require('./middleware/auth');
const { errors } = require('celebrate');
const NotFoundError = require('./errors/not-found-error');
require('dotenv').config();

const app = express();

const { PORT = 3001 } = process.env;

app.use(helmet());
const jsonParser = bodyParser.json();

mongoose.connect('mongodb://localhost:27017/aroundb');

app.post('/signin', login);
app.post('/signup', createUser);
app.use(auth);
app.use('/', jsonParser, usersRouter);

app.use('/', jsonParser, cardsRouter);

app.use('*', (req, res) => {
  throw new NotFoundError('Requested resource not found');
});
app.use(errors());
app.use((err, req, res, next) => {
  const { statusCode = SERVERERROR, message } = err;
  res
    .status(statusCode)
    .send({
      message: statusCode === SERVERERROR
        ? 'An error occurred on the server'
        : message
    });
});
app.listen(PORT, () => {
  console.log(`app listening on port ${PORT}`);
});
