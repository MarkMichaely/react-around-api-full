const BadRequestError = require('../errors/bad-request-error');
const NotFoundError = require('../errors/not-found-error');
const ForbiddenError = require('../errors/forbidden-err');
const Card = require('../models/card');

const getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch((err) => {
      next(err);
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
  const { _id } = req.params;
  Card.findById(_id)
    .orFail(() => new NotFoundError('No card found'))
    .then((card) => {
      if (!card.owner.equals(req.user._id)) {
        return next(new ForbiddenError("Unathorized Access"));
      }
      return Card.deleteOne(_id)
        .then(() => res.send({ message: 'Card succesfully removed' }))
    })
    .catch((err) => {
      if (err.name === 'CastError') next(new BadRequestError('unsupported cardId'));
      else next(err);
    });
};

const likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params._id,
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
    req.params._id,
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
