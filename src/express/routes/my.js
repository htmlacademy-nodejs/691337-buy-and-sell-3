'use strict';

const express = require(`express`);
const controller = require(`../controllers/my`);
const {auth} = require(`../jwt-auth`);

const myRouter = new express.Router();

myRouter.get(`/`, auth, controller.getOffers);
myRouter.get(`/comments`, auth, controller.getComments);

module.exports = myRouter;
