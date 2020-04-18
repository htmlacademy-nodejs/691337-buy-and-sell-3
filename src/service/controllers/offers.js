'use strict';
const {storage} = require(`../../storage`);
const {HttpCode} = require(`../../constants`);
const data = require(`../../../mocks`);

module.exports.getAll = async (req, res) => {
  const offers = storage.getAllOffers(data);
  return res.json(offers);
};

module.exports.getOffer = async (req, res) => {
  const offer = storage.getOfferById(data, req.params.offerId);

  if (!offer) {
    return res.status(HttpCode.NOT_FOUND).end();
  }

  return res.json(offer);
};

module.exports.getComments = async (req, res) => {
  const comments = storage.getComments(data, req.params.offerId);

  if (!comments) {
    return res.status(HttpCode.NOT_FOUND).end();
  }

  return res.json(comments);
};

module.exports.removeOffer = async (req, res) => {
  const offer = storage.removeOffer(data, req.params.offerId);

  if (!offer) {
    return res.status(HttpCode.NOT_FOUND).end();
  }

  return res.status(HttpCode.NO_CONTENT).end();
};

module.exports.removeComment = async (req, res) => {
  const comment = storage.removeComment(data, req.params.offerId, req.params.commentId);

  if (!comment) {
    return res.status(HttpCode.NOT_FOUND).end();
  }

  return res.status(HttpCode.NO_CONTENT).end();
};

module.exports.updateOffer = async (req, res) => {
  const isValid = storage.isValid(req.body);

  if (!isValid) {
    return res.status(HttpCode.BAD_REQUEST).send(`Bad request. Not all data`);
  }

  const offer = storage.updateOffer(data, req.params.offerId, req.body);

  if (!offer) {
    return res.status(HttpCode.NOT_FOUND).end();
  }

  return res.status(HttpCode.OK).json(offer);
};

module.exports.createComment = async (req, res) => {
  const isCommentValid = storage.isCommentValid(req.body.text);

  if (!isCommentValid) {
    return res.status(HttpCode.BAD_REQUEST).send(`Bad request. No comment text`);
  }

  const comment = storage.addOfferComment(data, req.params.offerId, req.body);

  if (!comment) {
    return res.status(HttpCode.NOT_FOUND).end();
  }

  return res.status(HttpCode.CREATED).json(comment);
};

module.exports.createOffer = async (req, res) => {
  const isValid = storage.isValid(req.body);

  if (!isValid) {
    return res.status(HttpCode.BAD_REQUEST).send(`Bad request. Not all data`);
  }

  const offer = storage.addNewOffer(data, req.body);
  return res.status(HttpCode.CREATED).json(offer);
};
