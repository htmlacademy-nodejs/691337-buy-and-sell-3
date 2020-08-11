'use strict';

const {Op} = require(`sequelize`);
const {Offer, Comment, Category} = require(`../service/db`);

const offerAttributes = [
  [`offer_id`, `id`],
  [`description_text`, `description`],
  [`picture_name`, `picture`],
  [`offer_title`, `title`],
  [`offer_type`, `type`],
  [`price`, `sum`]
];

const commentAttributes = [
  [`comment_id`, `id`],
  [`comment_text`, `text`]
];

module.exports.storage = {
  getCategories: async () => {
    const categories = await Category.findAll({
      attributes: [`category_title`]
    });
    return categories.map((it) => it.category_title);
  },
  getAllOffers: () => {
    return Offer.findAll({
      attributes: offerAttributes
    });
  },
  getOfferById: (offerId) => {
    return Offer.findByPk(offerId, {
      attributes: offerAttributes
    });
  },
  getComments: async (offerId) => {
    const offer = await Offer.findByPk(offerId);
    if (offer === null) {
      return undefined;
    }
    return Comment.findAll({
      attributes: commentAttributes,
      where: {'offer_id': offerId}
    });
  },
  removeOffer: (offerId) => {
    return Offer.destroy({where: {'offer_id': offerId}});
  },
  removeComment: (offerId, commentId) => {
    return Comment.destroy({
      where: {[Op.and]: [{'offer_id': offerId}, {'comment_id': commentId}]}
    });
  },
  isValid: (offer) => {
    const properties = [`category`, `description`, `picture`, `title`, `type`, `sum`];
    return properties.every((it) => offer.hasOwnProperty(it));
  },
  updateOffer: async (offerId, newData) => {
    const {title, picture, description, type, category, sum} = newData;
    const updatedOffer = {
      'offer_title': title,
      'picture_name': picture,
      'description_text': description,
      'offer_type': type,
      'price': sum,
    };
    const currentOffer = await Offer.findByPk(offerId);
    if (currentOffer === null) {
      return undefined;
    }
    const currentCategories = await currentOffer.getCategories();
    currentCategories.forEach(async (it) => await currentOffer.removeCategories(it));
    const categories = await Category.findAll({
      where: {'category_title': {[Op.in]: [category].flat()}}
    });
    await currentOffer.update(updatedOffer, {});
    await currentOffer.addCategories(categories);
    return currentOffer;
  },
  addOfferComment: async (offerId, comment) => {
    const offer = await Offer.findByPk(offerId);
    if (offer === null) {
      return undefined;
    }
    const {text} = comment;
    const newComment = Comment.create({
      'comment_text': text,
      'offer_id': offerId,
    });
    return newComment;
  },
  isCommentValid: (comment) => {
    return comment && comment.text !== `` ? true : false;
  },
  addNewOffer: async (newData) => {

    if (!newData) {
      return undefined;
    }

    const {title, picture, description, type, category, sum} = newData;

    const categories = await Category.findAll({
      where: {'category_title': {[Op.in]: [category].flat()}}
    });

    const newOffer = await Offer.create({
      'offer_title': title,
      'picture_name': picture,
      'description_text': description,
      'offer_type': type,
      'price': sum,
    });
    await newOffer.addCategories(categories);
    return newOffer;
  },
  getMatchedOffers: (searchString) => {
    return Offer.findAll({
      attributes: offerAttributes,
      where: {'offer_title': {[Op.substring]: searchString}}
    });
  },
};
