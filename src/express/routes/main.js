'use strict';

const express = require(`express`);
const request = require(`request-promise-native`);
const url = `http://localhost:3000/api/offers`;

const mainRouter = new express.Router();

const getOffers = async () => {
  try {
    const content = await request(url, {json: true});
    console.log(content);
  } catch (err) {
    console.error(`Error: ${err}`);
  }
};

mainRouter.get(`/`, getOffers);

module.exports = mainRouter;
