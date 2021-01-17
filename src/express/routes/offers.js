'use strict';

const express = require(`express`);
const controller = require(`../controllers/offers`);
const offersRouter = new express.Router();
const {upload} = require(`../../utils`);

offersRouter.use(express.json());

offersRouter.get(`/category/:id`, controller.getOffersByCategory);
offersRouter.get(`/add`, controller.getNewOfferForm);
offersRouter.post(`/add`, upload.single(`avatar`), controller.addOffer);
offersRouter.get(`/edit/:id`, controller.getOffer);
offersRouter.post(`/edit/:id`, upload.single(`avatar`), controller.updateOffer);
offersRouter.get(`/:id`, (req, res) => res.render(`offers/ticket`));

module.exports = offersRouter;
