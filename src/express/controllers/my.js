'use strict';
const axios = require(`axios`);
const {getData} = require(`../../utils`);
const {URL, HttpCode} = require(`../../constants`);

const OFFER_AMOUNT = 3;

module.exports.getOffers = async (req, res) => {
  try {
    const offers = await getData(`${URL}/offers`);
    return res.render(`offers/my-tickets`, {data: offers});
  } catch (err) {
    if (res.statusCode === HttpCode.INTERNAL_SERVER_ERROR) {
      return res.render(`errors/500`);
    } else {
      return res.render(`errors/400`);
    }
  }
};

module.exports.getComments = async (req, res) => {
  try {
    const data = await getData(`${URL}/offers`);
    const offerUrls = data.map((it) => it.id).slice(0, OFFER_AMOUNT)
    .map((it) => `${URL}/offers/${it}`);
    const commentsUrls = offerUrls.map((it) => `${it}/comments`);
    const offersData = await axios.all(offerUrls.map((it) => getData(it)));
    const commentsData = await axios.all(commentsUrls.map((it) => getData(it)));
    return res.render(`comments/comments`, {offers: offersData, comments: commentsData});
  } catch (err) {
    if (res.statusCode === HttpCode.INTERNAL_SERVER_ERROR) {
      return res.render(`errors/500`);
    } else {
      return res.render(`errors/400`);
    }
  }
};

