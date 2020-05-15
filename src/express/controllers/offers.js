'use strict';

const axios = require(`axios`);
const {getLogger} = require(`../../logger`);
const {getData} = require(`../../utils`);
const {URL, HttpCode} = require(`../../constants`);
const logger = getLogger();

module.exports.getOffer = async (req, res) => {
  try {
    const offerById = await getData(`${URL}/offers/${req.params.id}`);
    return res.render(`offers/ticket-edit`, {data: offerById});
  } catch (err) {
    if (res.statusCode === HttpCode.INTERNAL_SERVER_ERROR) {
      return res.render(`errors/500`);
    } else {
      return res.render(`errors/400`);
    }
  }
};

module.exports.getNewOfferForm = (req, res) => {
  try {
    return res.render(`offers/new-ticket`, {data: {}});
  } catch (err) {
    if (res.statusCode === HttpCode.INTERNAL_SERVER_ERROR) {
      return res.render(`errors/500`);
    } else {
      return res.render(`errors/400`);
    }
  }
};

module.exports.addOffer = async (req, res) => {
  const getPicture = () => {
    return req.files.length > 0 ? req.files[0].originalname : ``;
  };

  const offer = {
    title: req.body[`ticket-name`],
    picture: getPicture(),
    description: req.body.comment,
    category: req.body.category,
    type: req.body.action,
    sum: req.body.price,
  };

  try {
    await axios.post(`${URL}/offers`, offer);
    return res.redirect(`/my`);
  } catch (err) {
    logger.error(`Error: ${err}`);
    return res.render(`offers/new-ticket`, {data: offer});
  }
};
