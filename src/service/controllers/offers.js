'use strict';
const {storage} = require(`../../storage`);
const {HttpCode} = require(`../../constants`);
const data = require(`../../../mocks`);
const {getLogger} = require(`../../logger`);

const logger = getLogger();

module.exports.getAll = async (req, res) => {
  const offers = storage.getAllOffers(data);
  logger.info(`End request with status code ${res.statusCode}`);
  return res.json(offers);
};

module.exports.getOffer = async (req, res) => {
  const offer = storage.getOfferById(data, req.params.offerId);

  if (!offer) {
    logger.error(`End request with error ${HttpCode.NOT_FOUND}`);
    return res.status(HttpCode.NOT_FOUND).end();
  }

  logger.info(`End request with status code ${res.statusCode}`);
  return res.json(offer);
};

module.exports.getComments = async (req, res) => {
  const comments = storage.getComments(data, req.params.offerId);

  if (!comments) {
    logger.error(`End request with error ${HttpCode.NOT_FOUND}`);
    return res.status(HttpCode.NOT_FOUND).end();
  }

  logger.info(`End request with status code ${res.statusCode}`);
  return res.json(comments);
};

module.exports.removeOffer = async (req, res) => {
  const offer = storage.removeOffer(data, req.params.offerId);

  if (!offer) {
    logger.error(`End request with error ${HttpCode.NOT_FOUND}`);
    return res.status(HttpCode.NOT_FOUND).end();
  }

  logger.info(`End request with status code ${HttpCode.NO_CONTENT}`);
  return res.status(HttpCode.NO_CONTENT).end();
};

module.exports.removeComment = async (req, res) => {
  const comment = storage.removeComment(data, req.params.offerId, req.params.commentId);

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

  const offer = storage.updateOffer(data, req.params.offerId, req.body);

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

  const comment = storage.addOfferComment(data, req.params.offerId, req.body);

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

  const offer = storage.addNewOffer(data, req.body);
  logger.info(`End request with status code ${HttpCode.CREATED}`);
  return res.status(HttpCode.CREATED).json(offer);
};
