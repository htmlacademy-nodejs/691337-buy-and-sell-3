'use strict';
const axios = require(`axios`);
const {getLogger} = require(`../../logger`);
const {getData} = require(`../../utils`);
const {URL} = require(`../../constants`);

const OFFER_AMOUNT = 3;
const logger = getLogger();

module.exports.getOffers = async (req, res) => {
  try {
    const offers = await getData(`${URL}/offers`);
    return res.render(`offers/my-tickets`, {data: offers});
  } catch (err) {
    return logger.error(`Error: ${err}`);
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
    return logger.error(`Error: ${err}`);
  }
};

