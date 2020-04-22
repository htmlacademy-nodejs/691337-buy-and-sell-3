'use strict';

const express = require(`express`);
const {getLogger} = require(`../../logger`);
const offersRouter = require(`../routes/offers`);
const categoriesRouter = require(`../routes/categories`);
const searchRouter = require(`../routes/search`);

const app = express();
const logger = getLogger();

app.use((req, res, next) => {
  logger.debug(`Start request to url ${req.url}`);
  next();
});

app.use(express.json());
app.use(`/api/offers`, offersRouter);
app.use(`/api/categories`, categoriesRouter);
app.use(`/api/search`, searchRouter);

module.exports = app;
