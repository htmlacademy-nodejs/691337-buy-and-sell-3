'use strict';

const express = require(`express`);
const controller = require(`../controllers/offers`);
const offersRouter = new express.Router();
const checkValidity = require(`../validation/validator`);
const offerSchema = require(`../validation/schemes/offer-schema`);
const commentSchema = require(`../validation/schemes/comment-schema`);

offersRouter.use(express.json());

offersRouter.get(`/`, controller.getAll);
offersRouter.get(`/:offerId`, controller.getOffer);
offersRouter.get(`/:offerId/comments`, controller.getComments);
offersRouter.get(`/category/:categoryId`, controller.getOffersByCategory);
offersRouter.delete(`/:offerId`, controller.removeOffer);
offersRouter.delete(`/:offerId/comments/:commentId`, controller.removeComment);
offersRouter.put(`/:offerId`, checkValidity(offerSchema), controller.updateOffer);
offersRouter.post(`/`, checkValidity(offerSchema), controller.createOffer);
offersRouter.post(`/:offerId/comments`, checkValidity(commentSchema), controller.createComment);

module.exports = offersRouter;
