'use strict';

const express = require(`express`);
const controller = require(`../controllers/main`);
const {upload} = require(`../../utils`);
const mainRouter = new express.Router();

mainRouter.get(`/`, controller.getOffers);
mainRouter.get(`/login`, controller.getLoginForm);
mainRouter.get(`/register`, controller.getRegisterForm);
mainRouter.post(`/register`, upload.single(`avatar`), controller.addNewUser);
mainRouter.post(`/login`, upload.any(), controller.authenticateUser);
mainRouter.get(`/search`, controller.getMatchedOffers);

module.exports = mainRouter;
