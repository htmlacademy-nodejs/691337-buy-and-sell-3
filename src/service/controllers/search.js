'use strict';

const {getData} = require(`../../utils`);

const FILENAME = `mocks.json`;

module.exports.getSearch = async (req, res) => {
  const data = await getData(FILENAME);
  const searchString = req.query;
  const matchedOffers = data.filter((it) => it.title.includes(searchString.query));
  return res.json(matchedOffers);
};

