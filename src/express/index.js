'use strict';

const express = require(`express`);
const path = require(`path`);
const cookieParser = require(`cookie-parser`);
const {getLogger} = require(`../logger`);
const mainRoutes = require(`./routes/main`);
const offersRoutes = require(`./routes/offers`);
const myRoutes = require(`./routes/my`);

const PORT = 8080;
const PUBLIC_DIR = `public`;
const UPLOAD_DIR = `upload`;

const app = express();
const logger = getLogger();

app.use(cookieParser());

app.use(`/`, mainRoutes);
app.use(`/offers`, offersRoutes);
app.use(`/my`, myRoutes);

app.use(express.static(path.resolve(__dirname, PUBLIC_DIR)));
app.use(express.static(path.resolve(__dirname, UPLOAD_DIR)));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.set(`views`, path.resolve(__dirname, `templates`));
app.set(`view engine`, `pug`);

app.listen(PORT, () => {
  logger.info(`Server start on ${PORT}`);
})
.on(`error`, (err) => {
  logger.error(`Server can't start. Error: ${err}`);
});
