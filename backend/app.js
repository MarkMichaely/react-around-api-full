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
const cors = require("cors");
const { validateLogin, validateSignup } = require('./middleware/validation');

const app = express();

const { PORT = 3001 } = process.env;

app.use(helmet());
const jsonParser = bodyParser.json();

mongoose.connect('mongodb://localhost:27017/aroundb');
app.use(cors());
app.options('*', cors());
app.use(jsonParser);
app.post('/login', validateLogin, login);
app.post('/signup', validateSignup, createUser);
app.use(auth);
app.use('/', usersRouter);

app.use('/', cardsRouter);

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
