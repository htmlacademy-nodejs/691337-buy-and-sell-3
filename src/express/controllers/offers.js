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

