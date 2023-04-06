const BadRequestError = require('../errors/bad-request-error');
const ForbiddenError = require('../errors/forbidden-err');
const NotFoundError = require('../errors/not-found-error');
const ServerError = require('../errors/server-err');
const Card = require('../models/card');
const { BADREQUEST, NOTFOUND, SERVERERROR, FORBIDDEN } = require('../utils/errors');

const getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch(() => {
      next(new ServerError('An error has occured on the server'));
    });
};

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') next(new BadRequestError('Wrong data for card'));
      else next(err);
    });
};

const deleteCard = (req, res, next) => {
  if (req.params.id !== req.user._id) {
    throw new ForbiddenError('Access Forbidden');
  }
  Card.findByIdAndRemove(req.params.id)
    .then((doc) => {
      if (doc) {
        res.send({ message: 'Card succesfully removed' });
      } else throw NotFoundError('No card found');
    }).catch((err) => {
      if (err.name === 'CastError') next(new BadRequestError('unsupported cardId'));
      else next(err);
    });
};

const likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => {
      throw new NotFoundError('card not found');
    })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'CastError') next(new BadRequestError('unsupported cardId'));
      else next(err);
    });
};

const unLikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => {
      throw new NotFoundError('card not found');
    })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'CastError') next(new BadRequestError('unsupported cardId'));
      else next(err);
    });
};
module.exports = {
  getCards, deleteCard, createCard, likeCard, unLikeCard,
};
