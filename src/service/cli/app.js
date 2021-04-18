'use strict';

const express = require(`express`);
const {getLogger} = require(`../../logger`);
const cookieParser = require(`cookie-parser`);
const offersRouter = require(`../routes/offers`);
const categoriesRouter = require(`../routes/categories`);
const searchRouter = require(`../routes/search`);
const userRouter = require(`../routes/user`);

const app = express();
const logger = getLogger();

app.use(cookieParser());

app.use((req, res, next) => {
  logger.debug(`Start request to url ${req.url}`);
  next();
});

app.use(express.json());
app.use(`/api/offers`, offersRouter);
app.use(`/api/categories`, categoriesRouter);
app.use(`/api/search`, searchRouter);
app.use(`/api/user`, userRouter);

module.exports = app;
