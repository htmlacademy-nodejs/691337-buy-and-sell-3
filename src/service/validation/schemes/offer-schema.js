'use strict';

const Joi = require(`joi`);
const {OfferMessage} = require(`../../../constants`);

module.exports = Joi.object({
  title: Joi.string()
    .min(10)
    .max(100)
    .required()
    .messages({
      'any.required': OfferMessage.REQUIRED_FIELD,
      'string.min': OfferMessage.MIN_TITLE_LENGTH,
      'string.max': OfferMessage.MAX_TITLE_LENGTH
    }),
  picture: Joi.string()
    .required()
    .messages({
      'any.required': OfferMessage.REQUIRED_FIELD
    }),
  createdDate: Joi.string()
    .isoDate(),
  description: Joi.string()
    .min(50)
    .max(1000)
    .required()
    .messages({
      'any.required': OfferMessage.REQUIRED_FIELD,
      'string.empty': OfferMessage.MIN_DESCR_LENGTH,
      'string.min': OfferMessage.MIN_DESCR_LENGTH,
      'string.max': OfferMessage.MAX_DESCR_LENGTH
    }),
  type: Joi.string()
    .valid(`buy`, `sell`)
    .required()
    .messages({
      'any.required': OfferMessage.REQUIRED_FIELD
    }),
  category: Joi.array()
    .min(1)
    .items(Joi.string())
    .messages({
      'array.min': OfferMessage.CATEGORY_REQUIRED
    }),
  sum: Joi.number()
    .min(100)
    .required()
    .messages({
      'any.required': OfferMessage.REQUIRED_FIELD,
      'number.min': OfferMessage.MIN_PRICE
    }),
});
