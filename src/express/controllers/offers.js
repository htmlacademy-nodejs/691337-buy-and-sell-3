'use strict';

const axios = require(`axios`);
const {getLogger} = require(`../../logger`);
const {getData, renderError} = require(`../../utils`);
const {URL, DefaultData} = require(`../../constants`);
const logger = getLogger();

const offerPicture = [];

module.exports.getOffer = async (req, res) => {
  try {
    const offer = await getData(`${URL}/offers/${req.params.id}`);
    const categories = await getData(`${URL}/categories`);
    const categoriesTitle = categories.map((it) => it.title);
    offerPicture.push(offer.offerData.picture);
    return res.render(`offers/ticket-edit`, {
      data: offer.offerData,
      categories: offer.currentCategories,
      categoriesTitle,
      csrf: req.csrfToken(),
    });
  } catch (err) {
    return renderError(err.response.status, res);
  }
};

module.exports.getOffersByCategory = async (req, res) => {
  try {
    const currentPage = req.query.page;
    const categories = await getData(`${URL}/categories`);
    const data = await getData(`${URL}/offers/category/${req.params.id}/?page=${currentPage}`);
    return res.render(`offers/category`,
        {
          offers: data.offers,
          amount: data.offersAmount,
          pages: data.pagesAmount,
          current: data.currentPage,
          category: data.categoryData,
          view: data.pagesToView,
          categories
        });

  } catch (err) {
    return renderError(err.response.status, res);
  }
};

module.exports.getNewOfferForm = async (req, res) => {
  try {
    const categories = await getData(`${URL}/categories`);
    const categoriesTitle = categories.map((it) => it.title);
    return res.render(`offers/new-ticket`, {
      data: {},
      categoriesTitle,
      csrf: req.csrfToken(),
    });
  } catch (err) {
    return renderError(err.response.status, res);
  }
};

module.exports.addOffer = async (req, res) => {

  const offerDate = new Date();
  const normalizeCategory = (data) => {
    if (data === undefined) {
      return [];
    }
    return typeof data === `string` ? [data] : data;
  };

  const offer = {
    title: req.body[`ticket-name`],
    picture: req.file ? req.file.filename : DefaultData.picture,
    createdDate: offerDate.toISOString(),
    description: req.body.comment,
    category: normalizeCategory(req.body.category),
    type: req.body.action,
    sum: req.body.price,
  };

  try {
    await axios.post(`${URL}/offers`, offer);
    return res.redirect(`/my`);
  } catch (err) {
    logger.error(`Error: ${err}`);
    const errorsList = err.response.data.notValid;
    const categories = await getData(`${URL}/categories`);
    const categoriesTitle = categories.map((it) => it.title);
    return res.render(`offers/new-ticket`, {
      errorsList,
      data: offer,
      categoriesTitle});
  }
};

module.exports.updateOffer = async (req, res) => {

  const normalizeCategory = (data) => {
    if (data === undefined) {
      return [];
    }
    return typeof data === `string` ? [data] : data;
  };

  const offer = {
    title: req.body[`ticket-name`],
    picture: req.file ? req.file.filename : DefaultData.picture,
    description: req.body.comment,
    category: normalizeCategory(req.body.category),
    type: req.body.action,
    sum: req.body.price,
  };

  try {
    await axios.put(`${URL}/offers/${req.params.id}`, offer);
    return res.redirect(`/my`);
  } catch (err) {
    logger.error(`Error: ${err}`);
    const errorsList = err.response.data.notValid;
    const categories = await getData(`${URL}/categories`);
    const categoriesTitle = categories.map((it) => it.title);
    return res.render(`offers/ticket-edit`, {
      errorsList,
      data: offer,
      categories: offer.category,
      categoriesTitle});
  }
};
