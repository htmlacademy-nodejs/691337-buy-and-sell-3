'use strict';

const Joi = require(`joi`);

module.exports = Joi.object({
  userName: Joi.string()
    .alphanum()
    .required(),
  email: Joi.string()
  .email({
    minDomainSegments: 2,
    maxDomainSegments: 3
  })
    .required(),
  pass: Joi.string()
    .min(6)
    .required(),
  repeatPass: Joi.ref(`pass`),
  avatar: Joi.string()
    .required()
});
