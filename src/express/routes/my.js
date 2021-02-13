'use strict';

const express = require(`express`);
const controller = require(`../controllers/my`);

const myRouter = new express.Router();

myRouter.get(`/`, controller.auth, controller.getOffers);
myRouter.get(`/comments`, controller.auth, controller.getComments);

module.exports = myRouter;
