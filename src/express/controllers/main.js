'use strict';
const {getLogger} = require(`../../logger`);
const {getData} = require(`../../utils`);
const {URL} = require(`../../constants`);
const logger = getLogger();

module.exports.getOffers = async (req, res) => {
  try {
    const offers = await getData(`${URL}/offers`);
    return res.render(`main`, {data: offers});
  } catch (err) {
    return logger.error(`Error: ${err}`);
  }
};

module.exports.getMatchedOffers = async (req, res) => {
  try {
    const matchedOffers = await getData(`${URL}/search?query=${encodeURI(req.query.search)}`);
    return res.render(`search/search-result`, {data: matchedOffers});
  } catch (err) {
    return logger.error(`Error: ${err}`);
  }
};
