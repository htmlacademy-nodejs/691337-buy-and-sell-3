'use strict';

const express = require(`express`);
const controller = require(`../controllers/user`);
const userRouter = new express.Router();
const checkValidity = require(`../validation/validator`);
const userSchema = require(`../validation/schemes/user-schema`);

userRouter.use(express.json());

userRouter.post(`/`, [checkValidity(userSchema), controller.checkUserExists], controller.createUser);

module.exports = userRouter;
