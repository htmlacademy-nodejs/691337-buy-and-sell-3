'use strict';

const express = require(`express`);
const controller = require(`../controllers/search`);

const searchRouter = new express.Router();

searchRouter.get(`/`, controller.getMatchedOffers);

module.exports = searchRouter;
