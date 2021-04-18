'use strict';

const {getLogger} = require(`../../logger`);
const app = require(`./app`);
const {connectDb} = require(`../../data-service/db`);

const DEFAULT_PORT = 3000;
const logger = getLogger();

module.exports = {
  name: `--server`,
  run(args) {
    const [userPort] = args;
    const port = Number(parseInt(userPort, 10)) || DEFAULT_PORT;

    connectDb();

    app.listen(port, () => {
      logger.info(`Server start on ${port}`);
    })
    .on(`error`, (err) => {
      logger.error(`Server can't start. Error: ${err}`);
    });
  }
};
