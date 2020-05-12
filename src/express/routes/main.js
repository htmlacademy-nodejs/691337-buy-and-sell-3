'use strict';

const express = require(`express`);
const controller = require(`../controllers/main`);
const mainRouter = new express.Router();

mainRouter.get(`/`, controller.getOffers);
mainRouter.get(`/login`, (req, res) => res.render(`auth/login`));
mainRouter.get(`/register`, (req, res) => res.render(`auth/sign-up`));
mainRouter.get(`/search`, controller.getMatchedOffers);

module.exports = mainRouter;
