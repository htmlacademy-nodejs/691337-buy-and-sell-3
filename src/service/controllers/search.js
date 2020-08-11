'use strict';

const {storage} = require(`../../storage-db`);
const {getLogger} = require(`../../logger`);

const logger = getLogger();

module.exports.getSearch = async (req, res) => {
  const matchedOffers = await storage.getMatchedOffers(req.query.query);
  logger.info(`End request with status code ${res.statusCode}`);
  return res.json(matchedOffers);
};
