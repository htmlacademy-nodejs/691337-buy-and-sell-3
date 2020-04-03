'use strict';

const fs = require(`fs`).promises;

const FILENAME = `mocks.json`;
const mocks = [];

module.exports.data = mocks;

module.exports.getData = async () => {
  try {
    const content = await fs.readFile(FILENAME, `utf-8`);
    const data = JSON.parse(content);
    data.forEach((it) => mocks.push(it));
  } catch (err) {
    console.error(err);
  }
};

module.exports.routeMethod = {
  isLoaded: false,
  getCategories: (data) => {
    return data.map((it) => it.category)
          .flat()
          .reduce((acc, it) => !acc.includes(it) ? [...acc, it] : acc, []);
  },
  getAllOffers: (data) => {
    return data.map((it) => it.title);
  },
  getOfferIndex: (data, offerId) => {
    return data.map((it) => it.id).indexOf(offerId);
  },
  getCommentIndex: (data, index, commentId) => {
    return data[index].comments
      .map((it) => it.id).indexOf(commentId);
  },
  isValid: (offer) => {
    const properties = [`category`, `description`, `picture`, `title`, `type`, `sum`];
    return properties.every((it) => offer.hasOwnProperty(it));
  },
  createOfferObject: (offer) => {
    const {title, picture, description, type, category, sum} = offer;
    return {
      title,
      picture,
      description,
      type,
      category,
      sum,
    };
  },
  createNewCommentObject: (commentId, comment) => {
    const {text} = comment;
    return {
      id: commentId,
      text,
    };
  },
  createNewOfferObject: (offerId, offer) => {
    const {title, picture, description, type, category, sum} = offer;
    return {
      id: offerId,
      title,
      picture,
      description,
      type,
      category,
      sum,
      comments: [],
    };
  },
  getMatchedOffers: (data, searchString) => {
    return data.filter((it) => it.title.includes(searchString.query));
  }
};
