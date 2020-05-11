'use strict';

const express = require(`express`);
const controller = require(`../controllers/main`);
const mainRouter = new express.Router();

mainRouter.get(`/`, controller.getOffers);

module.exports = mainRouter;
