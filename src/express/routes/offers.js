'use strict';

const express = require(`express`);
const request = require(`request-promise-native`);
const offersRouter = new express.Router();
const url = `http://localhost:3000/api/offers`;

const getOffer = async (req, res) => {
  try {
    const offerById = await request(`${url}/${req.params.id}`, {json: true});
    console.log(offerById);
  } catch (err) {
    console.error(`Error: ${err}`);
  }
};

offersRouter.get(`/category/:id`, (req, res) => res.render(`offers/category`));
offersRouter.get(`/add`, (req, res) => res.render(`offers/new-ticket`));
offersRouter.get(`/edit/:id`, getOffer);
//offersRouter.get(`/edit/:id`, (req, res) => res.render(`offers/ticket-edit`));
offersRouter.get(`/:id`, (req, res) => res.render(`offers/ticket`));

module.exports = offersRouter;
