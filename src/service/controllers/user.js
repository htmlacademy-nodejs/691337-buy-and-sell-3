'use strict';

const {storage} = require(`../../storage-db`);
const {HttpCode} = require(`../../constants`);
const {getLogger} = require(`../../logger`);

const logger = getLogger();

module.exports.checkUserExists = async (req, res, next) => {
  const existsUser = await storage.checkEmail(req.body);

  if (existsUser) {
    logger.info(`End request with status code ${res.statusCode}`);
    return res.status(HttpCode.OK).json(`Пользователь с таким email уже зарегистрирован`);
  }

  return next();
};

module.exports.createUser = async (req, res) => {
  const user = await storage.addNewUser(req.body);

  if (!user) {
    logger.error(`End request with error ${HttpCode.NOT_FOUND}`);
    return res.status(HttpCode.NOT_FOUND).end();
  }

  logger.info(`End request with status code ${res.statusCode}`);
  return res.status(HttpCode.CREATED).json(user);
};
