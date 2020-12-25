'use strict';
const axios = require(`axios`);
const {getLogger} = require(`../../logger`);
const {getData, renderError} = require(`../../utils`);
const {URL, DefaultData} = require(`../../constants`);
const logger = getLogger();

module.exports.getOffers = async (req, res) => {
  try {
    const offers = await getData(`${URL}/offers`);
    const categories = await getData(`${URL}/categories`);
    return res.render(`main`, {data: offers, categories});
  } catch (err) {
    return renderError(err.response.status, res);
  }
};

module.exports.getMatchedOffers = async (req, res) => {
  try {
    const matchedOffers = await getData(`${URL}/search?query=${encodeURI(req.query.search)}`);
    return res.render(`search/search-result`, {data: matchedOffers});
  } catch (err) {
    return renderError(err.response.status, res);
  }
};

module.exports.getRegisterForm = (req, res) => {
  try {
    return res.render(`auth/sign-up`, {
      data: {}
    });
  } catch (err) {
    return renderError(err.response.status, res);
  }
};

module.exports.addNewUser = async (req, res) => {
  const getPicture = () => {
    return req.files.length > 0 ? req.files[0].originalname : DefaultData.picture;
  };

  const user = {
    userName: req.body[`user-name`],
    email: req.body[`user-email`],
    pass: req.body[`user-password`],
    repeatPass: req.body[`user-password-again`],
    avatar: getPicture()
  };

  try {
    await axios.post(`${URL}/user`, user);
    return res.redirect(`/login`);
  } catch (err) {
    logger.error(`Error: ${err}`);
    const errorsList = err.response.data.notValid;
    return res.render(`auth/sign-up`, {
      errorsList,
      data: user
    });
  }
};
