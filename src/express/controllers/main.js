'use strict';

const axios = require(`axios`);
const {getLogger} = require(`../../logger`);
const url = `http://localhost:3000/api/offers`;
const logger = getLogger();
const getData = (path) => {
  return axios.get(path).then((content) => content.data);
};

module.exports.getOffers = async (req, res) => {
  try {
    const offers = await getData(url);
    return res.render(`main`, {data: offers});
  } catch (err) {
    return logger.error(`Error: ${err}`);
  }
};
