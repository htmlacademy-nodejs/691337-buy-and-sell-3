'use strict';

const axios = require(`axios`);
const {getLogger} = require(`../../logger`);
const url = `http://localhost:3000/api/offers`;
const logger = getLogger();
const getData = (path) => {
  return axios.get(path).then((content) => content.data);
};

module.exports.getOffer = async (req, res) => {
  try {
    const offerById = await getData(`${url}/${req.params.id}`);
    return res.render(`offers/ticket-edit`, {data: offerById});
  } catch (err) {
    return logger.error(`Error: ${err}`);
  }
};

module.exports.getNewOfferForm = (req, res) => {
  return res.render(`offers/new-ticket`, {data: {}});
};

module.exports.addOffer = async (req, res) => {
  const offer = {
    title: req.body[`ticket-name`],
    picture: ``,
    description: req.body.comment,
    category: req.body.category,
    type: req.body.action,
    sum: req.body.price,
  };

  try {
    await axios.post(url, offer);
    return res.redirect(`/my`);
  } catch (err) {
    logger.error(`Error: ${err}`);
    return res.render(`offers/new-ticket`, {data: offer});
  }
};
