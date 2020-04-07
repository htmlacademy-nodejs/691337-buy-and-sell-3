'use strict';

const express = require(`express`);
const fs = require(`fs`).promises;
const offersRouter = new express.Router();

// offersRouter.use(express.json());

const FILENAME = `mocks.json`;

const onUserRequest = async (req, res) => {
  try {
    const content = await fs.readFile(FILENAME, `utf-8`);
    // res.set(`Content-Type`, `application/json`);
    // res.type(`application/json`);
    return res.json(content.length > 0 ? content : `[]`);
  } catch (err) {
    return res.json(`[]`);
  }
};

offersRouter.get(`/`, onUserRequest);

module.exports = offersRouter;
