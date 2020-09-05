'use strict';
const {storage} = require(`../../storage-db`);
const {HttpCode} = require(`../../constants`);
const {getLogger} = require(`../../logger`);

const logger = getLogger();

module.exports.getAll = async (req, res) => {
  const offers = await storage.getAllOffers();
  logger.info(`End request with status code ${res.statusCode}`);
  return res.json(offers);
};

module.exports.getOffer = async (req, res) => {
  const offer = await storage.getOfferById(req.params.offerId);

  if (!offer) {
    logger.error(`End request with error ${HttpCode.NOT_FOUND}`);
    return res.status(HttpCode.NOT_FOUND).end();
  }

  logger.info(`End request with status code ${res.statusCode}`);
  return res.json(offer);
};

module.exports.getOffersByCategory = async (req, res) => {
  const offers = await storage.getOffersByCategoryId(req.params.categoryId, req.query.page);
  return res.json(offers);
};

module.exports.getComments = async (req, res) => {
  const comments = await storage.getComments(req.params.offerId);

  if (!comments) {
    logger.error(`End request with error ${HttpCode.NOT_FOUND}`);
    return res.status(HttpCode.NOT_FOUND).end();
  }

  logger.info(`End request with status code ${res.statusCode}`);
  return res.json(comments);
};

module.exports.removeOffer = async (req, res) => {
  const offer = await storage.removeOffer(req.params.offerId);

  if (!offer) {
    logger.error(`End request with error ${HttpCode.NOT_FOUND}`);
    return res.status(HttpCode.NOT_FOUND).end();
  }

  logger.info(`End request with status code ${HttpCode.NO_CONTENT}`);
  return res.status(HttpCode.NO_CONTENT).end();
};

module.exports.removeComment = async (req, res) => {
  const comment = await storage.removeComment(req.params.offerId, req.params.commentId);

  if (!comment) {
    logger.error(`End request with error ${HttpCode.NOT_FOUND}`);
    return res.status(HttpCode.NOT_FOUND).end();
  }

  logger.info(`End request with status code ${HttpCode.NO_CONTENT}`);
  return res.status(HttpCode.NO_CONTENT).end();
};

module.exports.updateOffer = async (req, res) => {
  const isValid = storage.isValid(req.body);

  if (!isValid) {
    logger.error(`End request with error ${HttpCode.BAD_REQUEST}`);
    return res.status(HttpCode.BAD_REQUEST).send(`Bad request. Not all data`);
  }

  const offer = await storage.updateOffer(req.params.offerId, req.body);

  if (!offer) {
    logger.error(`End request with error ${HttpCode.NOT_FOUND}`);
    return res.status(HttpCode.NOT_FOUND).end();
  }

  logger.info(`End request with status code ${HttpCode.OK}`);
  return res.status(HttpCode.OK).json(offer);
};

module.exports.createComment = async (req, res) => {

  const isCommentValid = storage.isCommentValid(req.body.text);

  if (!isCommentValid) {
    logger.error(`End request with error ${HttpCode.BAD_REQUEST}`);
    return res.status(HttpCode.BAD_REQUEST).send(`Bad request. No comment text`);
  }

  const comment = await storage.addOfferComment(req.params.offerId, req.body);

  if (!comment) {
    logger.error(`End request with error ${HttpCode.NOT_FOUND}`);
    return res.status(HttpCode.NOT_FOUND).end();
  }

  logger.info(`End request with status code ${HttpCode.CREATED}`);
  return res.status(HttpCode.CREATED).json(comment);
};

module.exports.createOffer = async (req, res) => {
  const isValid = storage.isValid(req.body);

  if (!isValid) {
    logger.error(`End request with error ${HttpCode.BAD_REQUEST}`);
    return res.status(HttpCode.BAD_REQUEST).send(`Bad request. Not all data`);
  }

  const offer = await storage.addNewOffer(req.body);
  logger.info(`End request with status code ${HttpCode.CREATED}`);
  return res.status(HttpCode.CREATED).json(offer);
};
