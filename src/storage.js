'use strict';

const nanoid = require(`nanoid`);

const NOT_FOUND_INDEX = -1;
const ID_LENGTH = 6;

module.exports.storage = {
  getCategories: (data) => {
    return data.map((it) => it.category)
          .flat()
          .reduce((acc, it) => !acc.includes(it) ? [...acc, it] : acc, []);
  },
  getAllOffers: (data) => {
    return data.map((it) => ({id: it.id, title: it.title, category: it.category,
      description: it.description, picture: it.picture, type: it.type, sum: it.sum}));
  },
  getOfferById: (data, offerId) => {
    const index = data.map((it) => it.id).indexOf(offerId);
    return index !== NOT_FOUND_INDEX ? data[index] : undefined;
  },
  getComments: (data, offerId) => {
    const index = data.map((it) => it.id).indexOf(offerId);
    return index !== NOT_FOUND_INDEX ? data[index].comments : undefined;
  },
  removeOffer: (data, offerId) => {
    const index = data.map((it) => it.id).indexOf(offerId);
    return index !== NOT_FOUND_INDEX ? data.splice(index, 1) : undefined;
  },
  removeComment: (data, offerId, commentId) => {
    const index = data.map((it) => it.id).indexOf(offerId);

    if (index === NOT_FOUND_INDEX) {
      return undefined;
    }

    const commentIndex = data[index].comments
      .map((it) => it.id).indexOf(commentId);
    return commentIndex !== NOT_FOUND_INDEX ?
      data[index].comments.splice(commentIndex, 1) : undefined;
  },
  isValid: (offer) => {
    const properties = [`category`, `description`, `picture`, `title`, `type`, `sum`];
    return properties.every((it) => offer.hasOwnProperty(it));
  },
  updateOffer: (data, offerId, newData) => {
    const index = data.map((it) => it.id).indexOf(offerId);

    if (index === NOT_FOUND_INDEX || !newData) {
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
    data[index] = {...data[index], ...updatedOffer};
    return data[index];
  },
  addOfferComment: (data, offerId, comment) => {
    const index = data.map((it) => it.id).indexOf(offerId);

    if (index === NOT_FOUND_INDEX) {
      return undefined;
    }

    const {text} = comment;
    const newComment = {
      id: nanoid(ID_LENGTH),
      text,
    };
    data[index].comments.unshift(newComment);
    return newComment;
  },
  isCommentValid: (comment) => {
    return comment && comment.text !== `` ? true : false;
  },
  addNewOffer: (data, newData) => {

    if (!newData) {
      return undefined;
    }

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
    data.unshift(newOffer);
    return newOffer;
  },
  getMatchedOffers: (data, searchString) => {
    return data.filter((it) => it.title.includes(searchString));
  },
};
