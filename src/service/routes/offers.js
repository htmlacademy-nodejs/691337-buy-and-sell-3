'use strict';

const express = require(`express`);
const controller = require(`../controllers/offers`);
const offersRouter = new express.Router();

offersRouter.use(express.json());

offersRouter.get(`/`, controller.getAll);
offersRouter.get(`/:offerId`, controller.getOffer);
offersRouter.get(`/:offerId/comments`, controller.getComments);
offersRouter.delete(`/:offerId`, controller.removeOffer);
offersRouter.delete(`/:offerId/comments/:commentId`, controller.removeComment);
offersRouter.post(`/`, controller.createOffer);
offersRouter.put(`/:offerId`, controller.updateOffer);
offersRouter.put(`/:offerId/comments`, controller.createComment);

module.exports = offersRouter;
