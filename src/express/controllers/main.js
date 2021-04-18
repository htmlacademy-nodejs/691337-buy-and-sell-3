'use strict';
const axios = require(`axios`);
const {getLogger} = require(`../../logger`);
const {getData, renderError} = require(`../../utils`);
const {URL, DefaultData} = require(`../../constants`);
const logger = getLogger();

let isLogged = false;

module.exports.getOffers = async (req, res) => {
  try {
    const offers = await getData(`${URL}/offers`);
    const categories = await getData(`${URL}/categories`);
    const {avatar} = req.cookies;
    return res.render(`main`, {data: offers, categories, isLogged, avatar});
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

module.exports.getLoginForm = (req, res) => {
  try {
    return res.render(`auth/login`, {
      data: {}
    });
  } catch (err) {
    return renderError(err.response.status, res);
  }
};

module.exports.addNewUser = async (req, res) => {

  const user = {
    userName: req.body[`user-name`],
    email: req.body[`user-email`],
    pass: req.body[`user-password`],
    repeatPass: req.body[`user-password-again`],
    avatar: req.file ? req.file.filename : DefaultData.picture
  };

  try {
    await axios.post(`${URL}/user`, user);
    return res.redirect(`/login`);
  } catch (err) {
    logger.error(`Error: ${err}`);
    const errorsList = err.response.data;
    return res.render(`auth/sign-up`, {
      errorsList,
      data: user
    });
  }
};

module.exports.authenticateUser = async (req, res) => {
  const user = {
    email: req.body[`user-email`],
    pass: req.body[`user-password`],
  };

  try {
    const response = await axios.post(`${URL}/user/login`, user);
    isLogged = true;
    await res.cookie(`accessToken`, `${response.data.accessToken}`);
    await res.cookie(`refreshToken`, `${response.data.refreshToken}`);
    await res.cookie(`avatar`, `${response.data.avatar}`);
    return res.redirect(`/`);
  } catch (err) {
    logger.error(`Error: ${err}`);
    const errorsList = err.response.data;
    return res.render(`auth/login`, {
      errorsList,
      data: user
    });
  }
};

module.exports.logout = async (req, res) => {
  const {refreshToken} = req.cookies;

  try {
    await axios.post(`${URL}/user/logout`, {refreshToken});
    await res.clearCookie(`accessToken`);
    await res.clearCookie(`refreshToken`);
    await res.clearCookie(`avatar`);
    isLogged = false;
    return res.redirect(`/login`);
  } catch (err) {
    return renderError(err.response.status, res);
  }
};
