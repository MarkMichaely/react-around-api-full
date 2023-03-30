const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cardsRouter = require('./routes/cards');
const usersRouter = require('./routes/users');
const { NOTFOUND } = require('./utils/errors');

const app = express();

const { PORT = 3000 } = process.env;

app.use(helmet());
const jsonParser = bodyParser.json();

mongoose.connect('mongodb://localhost:27017/aroundb');
app.use((req, res, next) => {
  req.user = {
    _id: '64035c3ec61732d53d055169',
  };

  next();
});

app.use('/', jsonParser, usersRouter);

app.use('/', jsonParser, cardsRouter);

app.use('*', (req, res) => {
  res.status(NOTFOUND).json({ message: 'Requested resource not found' });
});

app.listen(PORT, () => {
  console.log(`app listening on port ${PORT}`);
});
