'use strict';

const express = require(`express`);

const {getLogger} = require(`../logger`);
// const mainRoute = require(`./routes/main`);
const offersRoutes = require(`./routes/offers`);
const myRoutes = require(`./routes/my`);
const searchRoute = require(`./routes/search`);
const registerRoute = require(`./routes/register`);
const loginRoute = require(`./routes/login`);

const controller = require(`./controllers/main`);

const PORT = 8080;
const PUBLIC_DIR = `markup`;

const logger = getLogger();

const Routes = {
  // '/': mainRoute,
  '/offers': offersRoutes,
  '/my': myRoutes,
  '/search': searchRoute,
  '/register': registerRoute,
  '/login': loginRoute,
};

const app = express();

app.set(`views`, `./src/express/templates`);
app.set(`view engine`, `pug`);

app.get(`/`, controller.getOffers);

app.use(express.static(PUBLIC_DIR));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

Object.entries(Routes).forEach(([key, value]) => app.use(key, value));

app.listen(PORT, () => {
  logger.info(`Server start on ${PORT}`);
})
.on(`error`, (err) => {
  logger.error(`Server can't start. Error: ${err}`);
});
