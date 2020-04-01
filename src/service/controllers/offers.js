'use strict';

const nanoid = require(`nanoid`);
const {getData} = require(`../../utils`);
const {HttpCode} = require(`../../constants`);

const FILENAME = `mocks.json`;
const INDEX_NOT_FOUND = -1;
const ID_LENGTH = 6;

module.exports.getAll = async (req, res) => {
  const data = await getData(FILENAME);
  return res.json(data.map((it) => it.title));
};

module.exports.getOffer = async (req, res) => {
  const data = await getData(FILENAME);
  const index = data.map((it) => it.id).indexOf(req.params.offerId);

  if (index === INDEX_NOT_FOUND) {
    return res.status(HttpCode.NOT_FOUND).end();
  }
  return res.json(data[index]);
};

module.exports.getComments = async (req, res) => {
  const data = await getData(FILENAME);
  const index = data.map((it) => it.id).indexOf(req.params.offerId);

  if (index === INDEX_NOT_FOUND) {
    return res.status(HttpCode.NOT_FOUND).end();
  }
  return res.json(data[index].comments);
};

module.exports.removeOffer = async (req, res) => {
  const data = await getData(FILENAME);
  const index = data.map((it) => it.id).indexOf(req.params.offerId);

  if (index === INDEX_NOT_FOUND) {
    return res.status(HttpCode.NOT_FOUND).end();
  }

  data.splice(index, 1);
  return res.status(HttpCode.NO_CONTENT).end();
};

module.exports.removeComment = async (req, res) => {
  const data = await getData(FILENAME);
  const index = data.map((it) => it.id).indexOf(req.params.offerId);
  const indexComment = data[index].comments
    .map((it) => it.id).indexOf(req.params.commentId);

  if (index === INDEX_NOT_FOUND || indexComment === INDEX_NOT_FOUND) {
    return res.status(HttpCode.NOT_FOUND).end();
  }

  data[index].comments.splice(indexComment, 1);
  return res.status(HttpCode.NO_CONTENT).end();
};

module.exports.updateOffer = async (req, res) => {
  const data = await getData(FILENAME);
  const index = data.map((it) => it.id).indexOf(req.params.offerId);
  const userOffer = req.body;
  const properties = [`category`, `description`, `picture`, `title`, `type`, `sum`];
  const isValid = properties.every((it) => userOffer.hasOwnProperty(it));

  if (index === INDEX_NOT_FOUND) {
    return res.status(HttpCode.NOT_FOUND).end();
  }

  if (!isValid) {
    return res.status(HttpCode.BAD_REQUEST).send(`Bad request. Not all data`);
  }

  const updatedOffer = {
    title: req.body.title,
    picture: req.body.picture,
    description: req.body.description,
    type: req.body.type,
    category: req.body.category,
    sum: req.body.sum,
  };

  data[index] = {...data[index], ...updatedOffer};

  return res.status(HttpCode.OK).send(`Offer was updated.`);
};

module.exports.createComment = async (req, res) => {
  const data = await getData(FILENAME);
  const index = data.map((it) => it.id).indexOf(req.params.offerId);

  if (index === INDEX_NOT_FOUND) {
    return res.status(HttpCode.NOT_FOUND).end();
  }

  if (!req.body.text || req.body.text === ``) {
    return res.status(HttpCode.BAD_REQUEST).send(`Bad request. No comment text`);
  }

  const newComment = {
    id: nanoid(ID_LENGTH),
    text: req.body.text,
  };
  data[index].comments.unshift(newComment);
  return res.status(HttpCode.CREATED).end();
};

module.exports.createOffer = async (req, res) => {
  const data = await getData(FILENAME);

  const userOffer = req.body;
  const properties = [`category`, `description`, `picture`, `title`, `type`, `sum`];
  const isValid = properties.every((it) => userOffer.hasOwnProperty(it));

  if (!isValid) {
    return res.status(HttpCode.BAD_REQUEST).send(`Bad request. Not all data`);
  }

  const newOffer = {
    id: nanoid(ID_LENGTH),
    title: req.body.title,
    picture: req.body.picture,
    description: req.body.description,
    type: req.body.type,
    category: req.body.category,
    sum: req.body.sum,
    comments: [],
  };

  data.unshift(newOffer);
  return res.status(HttpCode.CREATED).end();
};
