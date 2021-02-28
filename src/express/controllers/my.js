'use strict';
const axios = require(`axios`);
const {getData, renderError} = require(`../../utils`);
const {URL} = require(`../../constants`);

const OFFER_AMOUNT = 3;

module.exports.getOffers = async (req, res) => {
  try {
    const offers = await getData(`${URL}/offers`);
    const {avatar} = req.cookies;
    return res.render(`offers/my-tickets`, {data: offers, avatar});
  } catch (err) {
    return renderError(err.response.status, res);
  }
};

module.exports.getComments = async (req, res) => {
  try {
    const data = await getData(`${URL}/offers`);
    const {avatar} = req.cookies;
    const offerUrls = data.map((it) => it.id).slice(0, OFFER_AMOUNT)
    .map((it) => `${URL}/offers/${it}`);
    const commentsUrls = offerUrls.map((it) => `${it}/comments`);
    const offers = await axios.all(offerUrls.map((it) => getData(it)));
    const commentsData = await axios.all(commentsUrls.map((it) => getData(it)));
    return res.render(`comments/comments`, {offers: offers.map((it) => it.offerData), comments: commentsData, avatar});
  } catch (err) {
    return renderError(err.response.status, res);
  }
};
