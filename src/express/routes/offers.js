'use strict';

const express = require(`express`);
const multer = require(`multer`);
const controller = require(`../controllers/offers`);
const offersRouter = new express.Router();
const upload = multer();

offersRouter.use(express.json());

offersRouter.get(`/category/:id`, controller.getOffersByCategory);
offersRouter.get(`/add`, controller.getNewOfferForm);
offersRouter.post(`/add`, upload.any(), controller.addOffer);
offersRouter.get(`/edit/:id`, controller.getOffer);
offersRouter.get(`/:id`, (req, res) => res.render(`offers/ticket`));

module.exports = offersRouter;
