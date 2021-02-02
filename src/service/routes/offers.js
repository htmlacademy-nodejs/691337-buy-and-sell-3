'use strict';

const express = require(`express`);
const controller = require(`../controllers/offers`);
const offersRouter = new express.Router();
const checkValidity = require(`../validation/validator`);
const offerSchema = require(`../validation/schemes/offer-schema`);
const commentSchema = require(`../validation/schemes/comment-schema`);
const paramsValidator = require(`../validation/validator-params`);

offersRouter.use(express.json());

offersRouter.get(`/`, controller.auth, controller.getAll);
offersRouter.get(`/:offerId`, paramsValidator.checkOfferParams, controller.getOffer);
offersRouter.get(`/:offerId/comments`, paramsValidator.checkOfferParams, controller.getComments);
offersRouter.get(`/category/:categoryId`,
    paramsValidator.checkCategoryParams, controller.getOffersByCategory);
offersRouter.delete(`/:offerId`, paramsValidator.checkOfferParams, controller.removeOffer);
offersRouter.delete(`/:offerId/comments/:commentId`,
    paramsValidator.checkOfferParams, paramsValidator.checkCommentParams, controller.removeComment);
offersRouter.put(`/:offerId`, paramsValidator.checkOfferParams, checkValidity(offerSchema), controller.updateOffer);
offersRouter.post(`/`, checkValidity(offerSchema), controller.createOffer);
offersRouter.post(`/:offerId/comments`,
    paramsValidator.checkOfferParams, checkValidity(commentSchema), controller.createComment);

module.exports = offersRouter;
