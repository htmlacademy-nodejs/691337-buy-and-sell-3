'use strict';

const chalk = require(`chalk`);
const http = require(`http`);
const fs = require(`fs`).promises;

const {HttpCode} = require(`../../constants`);

const DEFAULT_PORT = 3000;
const FILENAME = `mocks.json`;

const sendResponse = (res, statusCode, message) => {
  const template = `
    <!DOCTYPE html>
      <html lang="ru">
        <head>
          <title>With love from Node</title>
        </head>
        <body>${message}</body>
    </html>`.trim();

  res.statusCode = statusCode;
  res.setHeader(`Content-Type`, `text/html; charset=utf-8`);
  res.end(template);
};

const onUserConnect = async (req, res) => {
  const notFoundMessage = `Not found`;

  switch (req.url) {
    case `/`:
      try {
        const content = await fs.readFile(FILENAME, `utf-8`);
        const mocks = JSON.parse(content);
        const message = `<ul>${mocks.map((it) => `<li>${it.title}</li>`).join(``)}</ul>`;
        sendResponse(res, HttpCode.OK, message);
      } catch (err) {
        sendResponse(res, HttpCode.NOT_FOUND, notFoundMessage);
      }
      break;
    default:
      sendResponse(res, HttpCode.NOT_FOUND, notFoundMessage);
      break;
  }
};

module.exports = {
  name: `--server`,
  run(args) {
    const [userPort] = args;
    const port = Number(parseInt(userPort, 10)) || DEFAULT_PORT;

    http.createServer(onUserConnect)
    .listen(port)
    .on(`listening`, (err) => {
      if (err) {
        return console.error(chalk.red(`Ошибка при создании сервера`, err));
      }
      return console.log(chalk.green(`Ожидаю соединений на ${port}`));
    });
  }
};
