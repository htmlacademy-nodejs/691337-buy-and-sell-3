'use strict';
process.argv.push(`--server`);

const request = require(`supertest`);
const app = require(`../cli/app`);
const {HttpCode} = require(`../../constants`);

const SEARCH_START = 1;
const SEARCH_LENGTH = 4;

test(`When get search status code should be 200`, async () => {
  const res = await request(app).get(`/api/offers`);
  const offerTitle = res.body[0].title;
  const queryString = offerTitle
  .slice(SEARCH_START, SEARCH_LENGTH);
  const resQuery = await request(app).get(`/api/search?query=${encodeURI(queryString)}`);
  expect(resQuery.statusCode).toBe(HttpCode.OK);
  expect(resQuery.body[0].title).toEqual(offerTitle);
});
