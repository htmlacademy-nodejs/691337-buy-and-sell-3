'use strict';

const express = require(`express`);
const controller = require(`../controllers/main`);
const {upload} = require(`../../utils`);
const mainRouter = new express.Router();

mainRouter.get(`/`, controller.getOffers);
mainRouter.get(`/login`, (req, res) => res.render(`auth/login`));
mainRouter.get(`/register`, controller.getRegisterForm);
mainRouter.post(`/register`, upload.single(`avatar`), controller.addNewUser);
mainRouter.get(`/search`, controller.getMatchedOffers);

module.exports = mainRouter;
