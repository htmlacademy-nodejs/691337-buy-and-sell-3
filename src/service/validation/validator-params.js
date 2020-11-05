'use strict';

const {HttpCode} = require(`../../constants`);
const {getLogger} = require(`../../logger`);

const logger = getLogger();

const MESSAGE = `Not correct data type by`;
const isInteger = (param) => Number.isInteger(Number(param));

module.exports.checkOfferParams = (req, res, next) => {
  const {offerId} = req.params;
  if (!isInteger(offerId)) {
    logger.error(`End request with error ${HttpCode.NOT_FOUND}`);
    return res.status(HttpCode.NOT_FOUND).json(`${MESSAGE} offerId`);
  }
  return next();
};

module.exports.checkCategoryParams = (req, res, next) => {
  const {categoryId} = req.params;
  if (!isInteger(categoryId)) {
    logger.error(`End request with error ${HttpCode.NOT_FOUND}`);
    return res.status(HttpCode.NOT_FOUND).json(`${MESSAGE} categoryId`);
  }
  return next();
};

module.exports.checkCommentParams = (req, res, next) => {
  const {commentId} = req.params;
  if (!isInteger(commentId)) {
    logger.error(`End request with error ${HttpCode.NOT_FOUND}`);
    return res.status(HttpCode.NOT_FOUND).json(`${MESSAGE} commentId`);
  }
  return next();
};
