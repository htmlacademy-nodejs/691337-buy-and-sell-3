'use strict';

const express = require(`express`);
const controller = require(`../controllers/offers`);
const offersRouter = new express.Router();

offersRouter.get(`/category/:id`, (req, res) => res.render(`offers/category`));
offersRouter.get(`/add`, (req, res) => res.render(`offers/new-ticket`));
offersRouter.get(`/edit/:id`, controller.getOffer);
offersRouter.get(`/:id`, (req, res) => res.render(`offers/ticket`));

module.exports = offersRouter;
