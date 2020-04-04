'use strict';

const nanoid = require(`nanoid`);
const mocks = require(`../mocks`);

const NOT_FOUND_INDEX = -1;
const ID_LENGTH = 6;

module.exports.storage = {
  getCategories: () => {
    return mocks.map((it) => it.category)
          .flat()
          .reduce((acc, it) => !acc.includes(it) ? [...acc, it] : acc, []);
  },
  getAllOffers: () => {
    return mocks.map((it) => it.title);
  },
  getOfferById: (offerId) => {
    const index = mocks.map((it) => it.id).indexOf(offerId);
    return index !== NOT_FOUND_INDEX ? mocks[index] : undefined;
  },
  getComments: (offerId) => {
    const index = mocks.map((it) => it.id).indexOf(offerId);
    return index !== NOT_FOUND_INDEX ? mocks[index].comments : undefined;
  },
  removeOffer: (offerId) => {
    const index = mocks.map((it) => it.id).indexOf(offerId);
    return index !== NOT_FOUND_INDEX ? mocks.splice(index, 1) : undefined;
  },
  removeComment: (offerId, commentId) => {
    const index = mocks.map((it) => it.id).indexOf(offerId);
    const commentIndex = mocks[index].comments
      .map((it) => it.id).indexOf(commentId);
    return index !== NOT_FOUND_INDEX && commentIndex !== NOT_FOUND_INDEX ?
      mocks[index].comments.splice(commentIndex, 1) : undefined;
  },
  isValid: (offer) => {
    const properties = [`category`, `description`, `picture`, `title`, `type`, `sum`];
    return properties.every((it) => offer.hasOwnProperty(it));
  },
  updateOffer: (offerId, newData) => {
    const index = mocks.map((it) => it.id).indexOf(offerId);
    const {title, picture, description, type, category, sum} = newData;
    const updatedOffer = {
      title,
      picture,
      description,
      type,
      category,
      sum,
    };
    mocks[index] = {...mocks[index], ...updatedOffer};
    return index !== NOT_FOUND_INDEX ? mocks[index] : undefined;
  },
  addOfferComment: (offerId, comment) => {
    const index = mocks.map((it) => it.id).indexOf(offerId);
    const {text} = comment;
    const newComment = {
      id: nanoid(ID_LENGTH),
      text,
    };
    return index !== NOT_FOUND_INDEX ?
      mocks[index].comments.unshift(newComment) : undefined;
  },
  isCommentValid: (comment) => {
    return comment && comment.text !== `` ? true : false;
  },
  addNewOffer: (newData) => {
    const {title, picture, description, type, category, sum} = newData;
    const newOffer = {
      id: nanoid(ID_LENGTH),
      title,
      picture,
      description,
      type,
      category,
      sum,
      comments: [],
    };
    return mocks.unshift(newOffer);
  },
  getMatchedOffers: (searchString) => {
    return mocks.filter((it) => it.title.includes(searchString));
  },
};
