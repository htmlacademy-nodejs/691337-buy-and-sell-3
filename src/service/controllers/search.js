'use strict';

const {storage} = require(`../../storage`);

module.exports.getSearch = async (req, res) => {
  const matchedOffers = storage.getMatchedOffers(req.query.query);
  return res.json(matchedOffers);
};
