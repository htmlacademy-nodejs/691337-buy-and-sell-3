'use strict';

const {storage} = require(`../../storage-db`);
const {getLogger} = require(`../../logger`);

const logger = getLogger();

module.exports.getAll = async (req, res) => {
  const categories = await storage.getCategories();
  logger.info(`End request with status code ${res.statusCode}`);
  return res.json(categories);
};
