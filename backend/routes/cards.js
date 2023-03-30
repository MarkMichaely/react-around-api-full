const express = require('express');
const {
  getCards,
  createCard,
  deleteCard,
  unLikeCard,
  likeCard,
} = require('../controllers/cards');

const cardsRouter = express.Router();

cardsRouter.get('/cards', getCards);

cardsRouter.post('/cards', createCard);

cardsRouter.delete('/cards/:id', deleteCard);

cardsRouter.put('/cards/:cardId/likes', likeCard);

cardsRouter.delete('/cards/:cardId/likes', unLikeCard);

module.exports = cardsRouter;
