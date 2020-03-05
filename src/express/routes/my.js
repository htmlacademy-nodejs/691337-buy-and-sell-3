'use strict';

const express = require(`express`);

const myRouter = new express.Router();

myRouter.get(`/`, (req, res) => res.render(`offers/my-tickets`));
myRouter.get(`/comments`, (req, res) => res.render(`comments/comments`));

module.exports = myRouter;
