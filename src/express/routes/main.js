'use strict';

const express = require(`express`);
const multer = require(`multer`);
const controller = require(`../controllers/main`);
const mainRouter = new express.Router();
const upload = multer();

mainRouter.get(`/`, controller.getOffers);
mainRouter.get(`/login`, (req, res) => res.render(`auth/login`));
mainRouter.get(`/register`, controller.getRegisterForm);
mainRouter.post(`/register`, upload.any(), controller.addNewUser);
mainRouter.get(`/search`, controller.getMatchedOffers);

module.exports = mainRouter;
