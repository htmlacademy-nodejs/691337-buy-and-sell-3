'use strict';

const Joi = require(`joi`);

module.exports = Joi.object({
  title: Joi.string()
    .min(10)
    .max(100)
    .required(),
  picture: Joi.string()
    .required(),
  createdDate: Joi.string()
    .isoDate()
    .required(),
  description: Joi.string()
    .min(50)
    .max(1000)
    .required(),
  type: Joi.string()
    .valid(`buy`, `sell`)
    .required(),
  category: Joi.array()
    .items(Joi.string()
    .required()),
  sum: Joi.number()
    .min(100)
    .required(),
});
