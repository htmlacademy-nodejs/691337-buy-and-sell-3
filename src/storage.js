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
    return mocks.map((it) => ({id: it.id, title: it.title}));
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

    if (index === NOT_FOUND_INDEX) {
      return undefined;
    }

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
    return mocks[index];
  },
  addOfferComment: (offerId, comment) => {
    const index = mocks.map((it) => it.id).indexOf(offerId);

    if (index === NOT_FOUND_INDEX) {
      return undefined;
    }

    const {text} = comment;
    const newComment = {
      id: nanoid(ID_LENGTH),
      text,
    };
    mocks[index].comments.unshift(newComment);
    return newComment;
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
    mocks.unshift(newOffer);
    return newOffer;
  },
  getMatchedOffers: (searchString) => {
    return mocks.filter((it) => it.title.includes(searchString));
  },
};
