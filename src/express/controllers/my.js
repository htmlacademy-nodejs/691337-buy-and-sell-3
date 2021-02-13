'use strict';
const axios = require(`axios`);
const jwt = require(`jsonwebtoken`);
const {JWT_ACCESS_SECRET} = require(`../../data-service/config`);
const {getLogger} = require(`../../logger`);
const {getData, renderError} = require(`../../utils`);
const {URL, HttpCode} = require(`../../constants`);

const logger = getLogger();

const OFFER_AMOUNT = 3;

module.exports.getOffers = async (req, res) => {
  try {
    const offers = await getData(`${URL}/offers`);
    return res.render(`offers/my-tickets`, {data: offers});
  } catch (err) {
    return renderError(err.response.status, res);
  }
};

module.exports.getComments = async (req, res) => {
  try {
    const data = await getData(`${URL}/offers`);
    const offerUrls = data.map((it) => it.id).slice(0, OFFER_AMOUNT)
    .map((it) => `${URL}/offers/${it}`);
    const commentsUrls = offerUrls.map((it) => `${it}/comments`);
    const offers = await axios.all(offerUrls.map((it) => getData(it)));
    const commentsData = await axios.all(commentsUrls.map((it) => getData(it)));
    return res.render(`comments/comments`, {offers: offers.map((it) => it.offerData), comments: commentsData});
  } catch (err) {
    return renderError(err.response.status, res);
  }
};

module.exports.auth = async (req, res, next) => {

  const {accessToken, refreshToken} = req.cookies;
  console.log(`This is accessToken: ${accessToken}`);

  if (!accessToken) {
    logger.error(`End request with error ${HttpCode.UNAUTHORIZED}`);
    return res.status(HttpCode.UNAUTHORIZED).end();
  }

  try {
    jwt.verify(accessToken, JWT_ACCESS_SECRET);
  } catch (err) {
    try {
      const response = await axios.post(`${URL}/user/refresh`, {refreshToken});
      console.log(response.data);
      await res.setHeader(`Set-Cookie`, [`accessToken=${response.data.accessToken}`, `refreshToken=${response.data.refreshToken}`]);
      return next();
    } catch (error) {
      logger.error(`End request with error ${HttpCode.FORBIDDEN}`);
      return res.status(HttpCode.FORBIDDEN).end();
    }
  }
  return next();
};

