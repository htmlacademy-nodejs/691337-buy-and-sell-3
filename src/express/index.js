'use strict';

const express = require(`express`);

const {getLogger} = require(`../logger`);
const mainRoutes = require(`./routes/main`);
const offersRoutes = require(`./routes/offers`);
const myRoutes = require(`./routes/my`);

const PORT = 8080;
const PUBLIC_DIR = `markup`;

const app = express();
const logger = getLogger();

app.use(`/`, mainRoutes);
app.use(`/offers`, offersRoutes);
app.use(`/my`, myRoutes);

app.use(express.static(PUBLIC_DIR));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.set(`views`, `./src/express/templates`);
app.set(`view engine`, `pug`);

app.listen(PORT, () => {
  logger.info(`Server start on ${PORT}`);
})
.on(`error`, (err) => {
  logger.error(`Server can't start. Error: ${err}`);
});
