'use strict';

const express = require(`express`);
const axios = require(`axios`);
//const request = require(`request-promise-native`);
const url = `http://localhost:3000/api/offers`;

const OFFER_AMOUNT = 3;

const myRouter = new express.Router();

/*
const getOffers = async () => {
  try {
    const offers = await request(url, {json: true});
    console.log(offers);
  } catch (err) {
    console.error(`Error: ${err}`);
  }
};
*/

const getData = (path) => {
  return axios.get(path).then((content) => content.data);
};

const getOffers = async () => {
  try {
    const offers = await getData(url);
    console.log(offers);
  } catch (err) {
    console.error(`Error: ${err}`);
  }
};

const getComments = async () => {
  try {
    const offers = await getData(url);
    const offerUrls = offers.map((it) => it.id).slice(0, OFFER_AMOUNT)
    .map((it) => `${url}/${it}/comments`);
    const comments = await axios.all(offerUrls.map((it) => getData(it)));
    console.log(comments);
  } catch (err) {
    console.error(`Error: ${err}`);
  }
};

/*
const getComments = async () => {
  try {
    const offers = await request(url, {json: true});
    const offerUrls = offers.map((it) => it.id).slice(0, OFFER_AMOUNT)
    .map((it) => `${url}/${it}/comments`);
    const comments = await Promise.all(offerUrls.map(async (it) => await request(it, {json: true})));
    console.log(comments);
  } catch (err) {
    console.error(`Error: ${err}`);
  }
};
*/

//myRouter.get(`/`, (req, res) => res.render(`offers/my-tickets`));
myRouter.get(`/`, getOffers);
//myRouter.get(`/comments`, (req, res) => res.render(`comments/comments`));
myRouter.get(`/comments`, getComments);

module.exports = myRouter;
