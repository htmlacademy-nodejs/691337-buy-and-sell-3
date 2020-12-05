'use strict';

const express = require(`express`);
const controller = require(`../controllers/user`);
const userRouter = new express.Router();

userRouter.use(express.json());

userRouter.post(`/`, controller.createUser);

module.exports = userRouter;
