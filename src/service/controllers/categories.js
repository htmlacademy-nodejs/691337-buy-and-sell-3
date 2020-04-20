'use strict';

const {storage} = require(`../../storage`);
const data = require(`../../../mocks`);
const {getLogger} = require(`../../logger`);

const logger = getLogger();

module.exports.getAll = async (req, res) => {
  const categories = storage.getCategories(data);
  logger.info(`End request with status code ${res.statusCode}`);
  return res.json(categories);
};
