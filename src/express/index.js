'use strict';

const express = require(`express`);

const offersRoutes = require(`./routes/offers`);
const myRoutes = require(`./routes/my`);
const searchRoutes = require(`./routes/search`);
const registerRoutes = require(`./routes/register`);
const loginRoutes = require(`./routes/login`);

const PORT = 8080;
const app = express();

const Routes = {
  offers: offersRoutes,
  my: myRoutes,
  search: searchRoutes,
  register: registerRoutes,
  login: loginRoutes,
};

Object.entries(Routes).forEach(([key, value]) => app.use(`/${key}`, value));

app.get(`/`, (req, res) => res.send(`/`));

app.listen(PORT, () => console.log(`Server is on ${PORT}`));
