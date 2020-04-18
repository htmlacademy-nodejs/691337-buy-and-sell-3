'use strict';

const express = require(`express`);
const offersRouter = require(`../routes/offers`);
const categoriesRouter = require(`../routes/categories`);
const searchRouter = require(`../routes/search`);

const app = express();

app.use(express.json());
app.use(`/api/offers`, offersRouter);
app.use(`/api/categories`, categoriesRouter);
app.use(`/api/search`, searchRouter);

module.exports = app;
