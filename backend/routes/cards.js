const express = require('express');
const {
  getCards,
  createCard,
  deleteCard,
  unLikeCard,
  likeCard,
} = require('../controllers/cards');
const { validateCreateCard, validateObjectId } = require('../middleware/validation');

const cardsRouter = express.Router();

cardsRouter.get('/cards', getCards);

cardsRouter.post('/cards', validateCreateCard, createCard);

cardsRouter.delete('/cards/:_id', validateObjectId, deleteCard);

cardsRouter.put('/cards/:_id/likes', validateObjectId, likeCard);

cardsRouter.delete('/cards/:_id/likes', validateObjectId, unLikeCard);

module.exports = cardsRouter;
