'use strict';

const nanoid = require(`nanoid`);
const {data, getData, routeMethod} = require(`../../storage`);
const {HttpCode} = require(`../../constants`);

const INDEX_NOT_FOUND = -1;
const ID_LENGTH = 6;

const checkData = async () => {

  if (!routeMethod.isLoaded) {
    await getData();
    routeMethod.isLoaded = true;
  }

};

module.exports.getAll = async (req, res) => {
  await checkData();
  const offers = routeMethod.getAllOffers(data);
  return res.json(offers);
};

module.exports.getOffer = async (req, res) => {
  await checkData();
  const index = routeMethod.getOfferIndex(data, req.params.offerId);

  if (index === INDEX_NOT_FOUND) {
    return res.status(HttpCode.NOT_FOUND).end();
  }

  return res.json(data[index]);
};

module.exports.getComments = async (req, res) => {
  await checkData();
  const index = routeMethod.getOfferIndex(data, req.params.offerId);

  if (index === INDEX_NOT_FOUND) {
    return res.status(HttpCode.NOT_FOUND).end();
  }

  return res.json(data[index].comments);
};

module.exports.removeOffer = async (req, res) => {
  await checkData();
  const index = routeMethod.getOfferIndex(data, req.params.offerId);

  if (index === INDEX_NOT_FOUND) {
    return res.status(HttpCode.NOT_FOUND).end();
  }

  data.splice(index, 1);
  return res.status(HttpCode.NO_CONTENT).end();
};

module.exports.removeComment = async (req, res) => {
  await checkData();
  const index = routeMethod.getOfferIndex(data, req.params.offerId);
  const commentIndex = routeMethod.getCommentIndex(data, index, req.params.commentId);

  if (index === INDEX_NOT_FOUND || commentIndex === INDEX_NOT_FOUND) {
    return res.status(HttpCode.NOT_FOUND).end();
  }

  data[index].comments.splice(commentIndex, 1);
  return res.status(HttpCode.NO_CONTENT).end();
};

module.exports.updateOffer = async (req, res) => {
  await checkData();
  const index = routeMethod.getOfferIndex(data, req.params.offerId);
  const isValid = routeMethod.isValid(req.body);

  if (index === INDEX_NOT_FOUND) {
    return res.status(HttpCode.NOT_FOUND).end();
  }

  if (!isValid) {
    return res.status(HttpCode.BAD_REQUEST).send(`Bad request. Not all data`);
  }

  const updatedOffer = routeMethod.createOfferObject(req.body);
  data[index] = {...data[index], ...updatedOffer};
  return res.status(HttpCode.OK).send(`Offer was updated.`);
};

module.exports.createComment = async (req, res) => {
  await checkData();
  const index = routeMethod.getOfferIndex(data, req.params.offerId);

  if (index === INDEX_NOT_FOUND) {
    return res.status(HttpCode.NOT_FOUND).end();
  }

  if (!req.body.text || req.body.text === ``) {
    return res.status(HttpCode.BAD_REQUEST).send(`Bad request. No comment text`);
  }

  const newComment = routeMethod.createNewCommentObject(nanoid(ID_LENGTH), req.body);
  data[index].comments.unshift(newComment);
  return res.status(HttpCode.CREATED).end();
};

module.exports.createOffer = async (req, res) => {
  await checkData();
  const isValid = routeMethod.isValid(req.body);

  if (!isValid) {
    return res.status(HttpCode.BAD_REQUEST).send(`Bad request. Not all data`);
  }

  const newOffer = routeMethod.createNewOfferObject(nanoid(ID_LENGTH), req.body);
  data.unshift(newOffer);
  return res.status(HttpCode.CREATED).end();
};
