'use strict';

const {storage} = require(`../../storage`);
const data = require(`../../../mocks`);

module.exports.getSearch = async (req, res) => {
  const matchedOffers = storage.getMatchedOffers(data, req.query.query);
  return res.json(matchedOffers);
};
