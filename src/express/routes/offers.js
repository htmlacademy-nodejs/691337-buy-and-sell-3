'use strict';

const express = require(`express`);
const controller = require(`../controllers/offers`);
const offersRouter = new express.Router();
const {auth} = require(`../jwt-auth`);
const {upload} = require(`../../utils`);

offersRouter.use(express.json());

offersRouter.get(`/category/:id`, controller.getOffersByCategory);
offersRouter.get(`/add`, auth, controller.getNewOfferForm);
offersRouter.post(`/add`, upload.single(`avatar`), auth, controller.addOffer);
offersRouter.get(`/edit/:id`, auth, controller.getOffer);
offersRouter.post(`/edit/:id`, upload.single(`avatar`), auth, controller.updateOffer);
offersRouter.get(`/:id`, (req, res) => res.render(`offers/ticket`));

module.exports = offersRouter;
