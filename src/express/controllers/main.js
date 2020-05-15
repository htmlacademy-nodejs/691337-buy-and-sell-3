'use strict';
const {getData} = require(`../../utils`);
const {URL, HttpCode} = require(`../../constants`);

module.exports.getOffers = async (req, res) => {
  try {
    const offers = await getData(`${URL}/offers`);
    return res.render(`main`, {data: offers});
  } catch (err) {
    if (res.status(HttpCode.INTERNAL_SERVER_ERROR)) {
      return res.render(`errors/500`);
    } else {
      return res.render(`errors/400`);
    }
  }
};

module.exports.getMatchedOffers = async (req, res) => {
  try {
    const matchedOffers = await getData(`${URL}/search?query=${encodeURI(req.query.search)}`);
    return res.render(`search/search-result`, {data: matchedOffers});
  } catch (err) {
    if (res.status(HttpCode.INTERNAL_SERVER_ERROR)) {
      return res.render(`errors/500`);
    } else {
      return res.render(`errors/400`);
    }
  }
};
