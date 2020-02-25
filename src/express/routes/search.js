'use strict';

const express = require(`express`);
const searchRouter = new express.Router();

searchRouter.get(`/`, (req, res) => res.send(`/seach`));

module.exports = searchRouter;
