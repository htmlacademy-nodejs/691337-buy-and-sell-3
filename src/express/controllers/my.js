'use strict';
const axios = require(`axios`);
const {getLogger} = require(`../../logger`);
const url = `http://localhost:3000/api/offers`;

const OFFER_AMOUNT = 3;
const logger = getLogger();

const getData = (path) => {
  return axios.get(path).then((content) => content.data);
};

module.exports.getOffers = async (req, res) => {
  try {
    const offers = await getData(url);
    return res.render(`offers/my-tickets`, {data: offers});
  } catch (err) {
    return logger.error(`Error: ${err}`);
  }
};

module.exports.getComments = async (req, res) => {
  try {
    const data = await getData(url);
    const offerUrls = data.map((it) => it.id).slice(0, OFFER_AMOUNT)
    .map((it) => `${url}/${it}`);
    const commentsUrls = offerUrls.map((it) => `${it}/comments`);
    const offersData = await axios.all(offerUrls.map((it) => getData(it)));
    const commentsData = await axios.all(commentsUrls.map((it) => getData(it)));
    return res.render(`comments/comments`, {offers: offersData, comments: commentsData});
  } catch (err) {
    return logger.error(`Error: ${err}`);
  }
};

