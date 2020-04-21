'use strict';

const packageJsonFile = require(`../../../package.json`);
const {getLogger} = require(`../../logger`);

const logger = getLogger();

module.exports = {
  name: `--version`,
  run() {
    const version = packageJsonFile.version;
    logger.info(version);
  }
};
