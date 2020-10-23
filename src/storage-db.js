'use strict';

const {Op} = require(`sequelize`);
const {Offer, Comment, Category} = require(`../service/db`);

const START_PAGE = 1;
const OFFERS_PER_PAGE = 8;
const PAGES_AMOUNT_MAX = 5;

const offerAttributes = [
  [`offer_id`, `id`],
  [`description_text`, `description`],
  [`picture_name`, `picture`],
  [`created_date`, `createdDate`],
  [`offer_title`, `title`],
  [`offer_type`, `type`],
  [`price`, `sum`]
];

const commentAttributes = [
  [`comment_id`, `id`],
  [`comment_text`, `text`]
];

const categoryAttributes = [
  [`category_id`, `id`],
  [`category_title`, `title`],
  [`picture_name`, `picture`]
];

const getCategoryTitle = (categories) => {
  return categories.map((it) => it.category_title);
};

const normalizeOfferData = (offer) => {
  const {id, title, type, sum, picture, description, categories} = offer.dataValues;
  return {
    id,
    title,
    type,
    sum,
    description,
    picture,
    category: getCategoryTitle(categories),
  };
};

const getPagesToView = (pagesAmount, currentPage) => {
  const offset = currentPage > PAGES_AMOUNT_MAX ? currentPage - PAGES_AMOUNT_MAX : 0;
  const firstIndex = START_PAGE + offset;
  const lastIndex = pagesAmount < PAGES_AMOUNT_MAX ? pagesAmount : PAGES_AMOUNT_MAX + offset;
  return {
    firstIndex,
    lastIndex,
    previous: offset > 0,
    next: pagesAmount > PAGES_AMOUNT_MAX && pagesAmount > lastIndex
  };
};

module.exports.storage = {
  getCategories: async () => {
    const rawCategories = await Category.findAll({
      attributes: categoryAttributes
    });
    const categories = await Promise.all(Array(rawCategories.length)
      .fill({})
      .map((async (it, index) => {
        const {id, title, picture} = rawCategories[index].dataValues;
        const currentCategory = await Category.findByPk(id);
        const offersAmount = await currentCategory.countOffers();
        return {id, title, picture, offersAmount};
      })));
    return categories.filter((it) => it.offersAmount > 0);
  },
  getAllOffers: () => {
    return Offer.findAll({
      attributes: offerAttributes,
      limit: OFFERS_PER_PAGE
    });
  },
  getOfferById: async (offerId) => {
    const currentOffer = await Offer.findByPk(offerId);
    const categories = await currentOffer.getCategories();
    const currentCategories = getCategoryTitle(categories);
    const offerData = await Offer.findByPk(offerId, {
      attributes: offerAttributes
    });
    return {offerData, currentCategories};
  },
  getOffersByCategoryId: async (categoryId, page) => {
    const category = await Category.findByPk(categoryId, {
      attributes: [`category_id`]
    });
    const offersAmount = await category.countOffers();
    const pagesAmount = Math.ceil(offersAmount / OFFERS_PER_PAGE);
    const currentPage = parseInt(page, 10) || START_PAGE;
    const rawOffers = await category.getOffers({
      attributes: offerAttributes,
      include: [`categories`],
      order: [[`created_date`, `DESC`]],
      offset: currentPage * OFFERS_PER_PAGE - OFFERS_PER_PAGE,
      limit: OFFERS_PER_PAGE
    });
    const offers = rawOffers.map((it) => normalizeOfferData(it));
    const categoryData = await Category.findByPk(categoryId, {
      attributes: categoryAttributes
    });
    const pagesToView = getPagesToView(pagesAmount, currentPage);
    return {offers, offersAmount, pagesAmount, currentPage, categoryData, pagesToView};
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
  updateOffer: async (offerId, newData) => {
    const {title, picture, createdDate, description, type, category, sum} = newData;
    const updatedOffer = {
      'offer_title': title,
      'picture_name': picture,
      'created_date': createdDate,
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
  addNewOffer: async (newData) => {
    if (!newData) {
      return undefined;
    }
    const {title, picture, createdDate, description, type, category, sum} = newData;
    const categories = await Category.findAll({
      where: {'category_title': {[Op.in]: category}}
    });
    const newOffer = await Offer.create({
      'offer_title': title,
      'picture_name': picture,
      'created_date': createdDate,
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
