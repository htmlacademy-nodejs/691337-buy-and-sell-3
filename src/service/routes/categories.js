'use strict';

const express = require(`express`);
const controller = require(`../controllers/categories`);
const categoriesRouter = new express.Router();

categoriesRouter.use(express.json());

categoriesRouter.get(`/`, controller.getAll);

module.exports = categoriesRouter;
