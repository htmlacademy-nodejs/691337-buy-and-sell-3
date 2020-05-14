'use strict';

const axios = require(`axios`);
const {getLogger} = require(`../../logger`);
const {getData} = require(`../../utils`);
const {URL, HttpCode} = require(`../../constants`);
const logger = getLogger();

module.exports.getOffer = async (req, res) => {
  try {
    const offerById = await getData(`${URL}/offers/${req.params.id}`);
    if (!offerById) {
      return res.status(HttpCode.NOT_FOUND).render(`errors/400`);
    } else {
      return res.status(HttpCode.OK).render(`offers/ticket-edit`, {data: offerById});
    }
  } catch (err) {
    return logger.error(`${err}`);
  }
};

module.exports.getNewOfferForm = (req, res) => {
  return res.render(`offers/new-ticket`, {data: {}});
};

module.exports.addOffer = async (req, res) => {
  const offer = {
    title: req.body[`ticket-name`],
    picture: req.files[0].originalname,
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
