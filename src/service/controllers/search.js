'use strict';

const {storage} = require(`../../storage`);
const data = require(`../../../mocks`);
const {getLogger} = require(`../../logger`);

const logger = getLogger();

module.exports.getSearch = async (req, res) => {
  const matchedOffers = storage.getMatchedOffers(data, req.query.query);
  logger.info(`End request with status code ${res.statusCode}`);
  return res.json(matchedOffers);
};
