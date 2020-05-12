'use strict';

const axios = require(`axios`);
const {getLogger} = require(`../../logger`);
const url = `http://localhost:3000/api`;
const logger = getLogger();
const getData = (path) => {
  return axios.get(path).then((content) => content.data);
};

module.exports.getOffers = async (req, res) => {
  try {
    const offers = await getData(`${url}/offers`);
    return res.render(`main`, {data: offers});
  } catch (err) {
    return logger.error(`Error: ${err}`);
  }
};

module.exports.getMatchedOffers = async (req, res) => {
  try {
    const matchedOffers = await getData(`${url}/search?query=${encodeURI(req.query.search)}`);
    return res.render(`search/search-result`, {data: matchedOffers});
  } catch (err) {
    return logger.error(`Error: ${err}`);
  }
};
