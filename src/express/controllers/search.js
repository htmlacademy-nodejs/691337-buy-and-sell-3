'use strict';
const axios = require(`axios`);
const {getLogger} = require(`../../logger`);
const url = `http://localhost:3000/api/search`;

const logger = getLogger();

const str = `спин`;
const getData = (path) => {
  return axios.get(path).then((content) => content.data);
};

module.exports.getMatchedOffers = async (req, res) => {
  try {
    const matchedOffers = await getData(`${url}?query=${encodeURI(str)}`);
    console.log(matchedOffers);
    return res.render(`search/search-result`, {data: matchedOffers});
  } catch (err) {
    return logger.error(`Error: ${err}`);
  }
};
