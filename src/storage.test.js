'use strict';
const {storage} = require(`./storage`);

const mocks = require(`../__fixtures__/test-mocks`);
const categoriesExpected = require(`../__fixtures__/categories`);
const offersExpected = require(`../__fixtures__/offers`);
const offerExpected = require(`../__fixtures__/offer-id`);
const commentExpected = require(`../__fixtures__/comment`);

const negativeCases = [
  [storage.getOfferById, mocks],
  [storage.getOfferById, mocks, `Dd-ddR`],
  [storage.getComments, mocks],
  [storage.removeOffer, mocks, `Dd-ddR`],
  [storage.removeComment, mocks],
  [storage.removeComment, mocks, `pk29O5`],
  [storage.updateOffer, mocks],
  [storage.updateOffer, mocks, `Pr-jOR`],
  [storage.addOfferComment, mocks],
  [storage.addNewOffer, mocks]
];

const positiveCases = [
  [storage.getCategories, categoriesExpected, mocks],
  [storage.getAllOffers, offersExpected, mocks],
  [storage.getOfferById, offerExpected, mocks, `Pr-jOR`],
  [storage.removeOffer, [offerExpected], mocks, `Pr-jOR`],
  [storage.removeComment, [commentExpected], mocks, `pk29O5`, `TWCRqj`],
];

describe(`negative Cases`, () => {
  test.each(negativeCases)(`%p`, (fn, ...rest) => {
    expect(fn(...rest)).toBeUndefined();
  });
});

describe(`positive Cases`, () => {
  test(`getMatched`, () => {
    expect(storage.getMatchedOffers(mocks, `сервиз`)).toEqual([offerExpected]);
  });
  test(`[Function getComments]`, () => {
    expect(storage.getComments(mocks, `pk29O5`)).toContainEqual(commentExpected);
  });
  test(`[Function addOfferComment]`, () => {
    expect(storage.addOfferComment(mocks, `lM-rnH`, commentExpected).text).toEqual(commentExpected.text);
  });
  test.each(positiveCases)(`%p`, (fn, expected, ...rest) => {
    expect(fn(...rest)).toEqual(expected);
  });
  test(`validation of offer data`, () => {
    expect(storage.isValid(offerExpected)).toBe(true);
    expect(storage.isValid(commentExpected)).toBe(false);
  });
  test(`validation of comment data`, () => {
    expect(storage.isCommentValid(commentExpected)).toBe(true);
  });
  test(`[Function updateOffer]`, () => {
    expect(storage.updateOffer(mocks, `pk29O5`, offerExpected).title).toEqual(offerExpected.title);
  });
  test(`[Function addNewOffer]`, () => {
    expect(storage.addNewOffer(mocks, offerExpected).sum).toEqual(offerExpected.sum);
  });
});
