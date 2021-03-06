'use strict';

const axios = require(`axios`);
const bcrypt = require(`bcrypt`);
const {HttpCode} = require(`./constants`);
const {getLogger} = require(`./logger`);
const logger = getLogger();

const saltRounds = 10;

module.exports.getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

module.exports.shuffle = (someArray) => {
  for (let i = someArray.length - 1; i > 0; i--) {
    const randomPosition = Math.floor(Math.random() * i);
    [someArray[i], someArray[randomPosition]] = [someArray[randomPosition], someArray[i]];
  }

  return someArray;
};

module.exports.getData = async (path) => {
  try {
    const content = await axios.get(path);
    return content.data;
  } catch (err) {
    logger.error(`Error: ${err.message}`);
    throw err;
  }
};

module.exports.renderError = (errStatus, res) => {

  if (errStatus >= HttpCode.INTERNAL_SERVER_ERROR) {
    res.status(errStatus).render(`errors/500`);
  } else {
    res.status(errStatus).render(`errors/400`);
  }
};

module.exports.getPassHashSum = async (pass) => {
  const hash = await bcrypt.hash(pass, saltRounds);
  return hash;
};
