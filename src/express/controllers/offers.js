'use strict';

const axios = require(`axios`);
const {getLogger} = require(`../../logger`);
const {getData, renderError} = require(`../../utils`);
const {URL} = require(`../../constants`);
const logger = getLogger();

module.exports.getOffer = async (req, res) => {
  try {
    const offerById = await getData(`${URL}/offers/${req.params.id}`);
    return res.render(`offers/ticket-edit`, {data: offerById});
  } catch (err) {
    return renderError(err.response.status, res);
  }
};

module.exports.getOffersByCategory = async (req, res) => {
  try {
    const currentPage = req.query.page;
    const data = await getData(`${URL}/offers/category/${req.params.id}/?page=${currentPage}`);
    return res.render(`offers/category`,
        {
          offers: data.offers,
          amount: data.offersAmount,
          pages: data.pagesAmount,
          current: data.currentPage,
          category: data.categoryData,
          view: data.pagesToView
        });

  } catch (err) {
    return renderError(err.response.status, res);
  }
};

module.exports.getNewOfferForm = (req, res) => {
  try {
    return res.render(`offers/new-ticket`, {data: {}});
  } catch (err) {
    return renderError(err.response.status, res);
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


