const Card = require('../models/card');
const { BADREQUEST, NOTFOUND, SERVERERROR, FORBIDDEN } = require('../utils/errors');

const getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch(() => res.status(SERVERERROR).send({ message: 'An error has occured on the server' }));
};

const createCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') res.status(BADREQUEST).send({ message: 'Wrong data for card' });
      else res.status(SERVERERROR).send({ message: 'An error has occured on the server' });
    });
};

const deleteCard = (req, res) => {
  if (req.params.id !== req.user._id) {
    res.status(FORBIDDEN).send({ message: 'Access Forbidden' });
  }
  Card.findByIdAndRemove(req.params.id)
    .then((doc) => {
      if (doc) {
        res.send({ message: 'Card succesfully removed' });
      } else res.status(NOTFOUND).send({ message: 'No card found' });
    }).catch((err) => {
      if (err.name === 'CastError') res.status(BADREQUEST).send({ message: 'unsupported cardId' });
      res.status(SERVERERROR).send({ message: 'An error has occured on the server' });
    });
};

const likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => {
      const error = new Error('card not found');
      error.statusCode = NOTFOUND;
      throw error;
    })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'CastError') res.status(BADREQUEST).send({ message: 'unsupported cardId' });
      else if (err.status === NOTFOUND) res.status(NOTFOUND).send({ message: err.message });
      else res.status(SERVERERROR).send({ message: 'An error has occured on the server' });
    });
};

const unLikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => {
      const error = new Error('card not found');
      error.statusCode = NOTFOUND;
      throw error;
    })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'CastError') res.status(BADREQUEST).send({ message: 'unsupported cardId' });
      else if (err.status === NOTFOUND) res.status(NOTFOUND).send({ message: err.message });
      else res.status(SERVERERROR).send({ message: 'An error has occured on the server' });
    });
};
module.exports = {
  getCards, deleteCard, createCard, likeCard, unLikeCard,
};
