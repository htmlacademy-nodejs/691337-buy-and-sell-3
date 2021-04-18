'use strict';

const express = require(`express`);
const csrf = require(`csurf`);
const controller = require(`../controllers/offers`);
const offersRouter = new express.Router();
const {auth} = require(`../jwt-auth`);
const {upload} = require(`../../utils`);

const csrfProtection = csrf({cookie: true});
offersRouter.use(express.json());

offersRouter.get(`/category/:id`, controller.getOffersByCategory);
offersRouter.get(`/add`, [csrfProtection, auth], controller.getNewOfferForm);
offersRouter.post(`/add`, upload.single(`avatar`), [csrfProtection, auth], controller.addOffer);
offersRouter.get(`/edit/:id`, [csrfProtection, auth], controller.getOffer);
offersRouter.post(`/edit/:id`, upload.single(`avatar`), [csrfProtection, auth], controller.updateOffer);
offersRouter.get(`/:id`, (req, res) => res.render(`offers/ticket`));

module.exports = offersRouter;
