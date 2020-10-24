'use strict';
process.argv.push(`--server`);

const request = require(`supertest`);
//const nanoid = require(`nanoid`);
const app = require(`../cli/app`);
const {HttpCode} = require(`../../constants`);
const newOffer = require(`../../../__fixtures__/offer-id-new`);
const newComment = require(`../../../__fixtures__/comment-new`);

//const WRONG_ID = nanoid(50);

describe(`GET routes api/offers`, () => {
  test(`When get offer status code should be 200, check properties`, async () => {
    const res = await request(app).get(`/api/offers`);
    const id = res.body[0].id;
    const resOffer = await request(app).get(`/api/offers/${id}`);
    expect(resOffer.statusCode).toBe(HttpCode.OK);
    expect(resOffer.body.offerData).toHaveProperty(`id`);
    expect(resOffer.body.offerData).toHaveProperty(`title`);
  });
  test(`When get comments status code should be 200`, async () => {
    const res = await request(app).get(`/api/offers`);
    const id = res.body[0].id;
    const resComments = await request(app).get(`/api/offers/${id}/comments`);
    expect(resComments.statusCode).toBe(HttpCode.OK);
  });
  /*test(`When get offer with wrong Id`, async () => {
    const resOffer = await request(app).get(`/api/offers/${WRONG_ID}`);
    expect(resOffer.statusCode).toBe(HttpCode.NOT_FOUND);
  });*/
  /*test(`When get comments with wrong offerId`, async () => {
    const resComments = await request(app).get(`/api/offers/${WRONG_ID}/comments`);
    expect(resComments.statusCode).toBe(HttpCode.NOT_FOUND);
  });*/
});

/************************** */
describe(`PUT routes api/offers`, () => {
  test(`When update offer status code should be 200, check properties`, async () => {
    const res = await request(app).get(`/api/offers`);
    const offer = res.body[0];
    const resOffer = await request(app).put(`/api/offers/${offer.id}`).send(newOffer);
    expect(resOffer.statusCode).toBe(HttpCode.OK);
    //ниже ключи из базы данных - надо что-то делать
    expect(resOffer.body.offer_id).toEqual(offer.id);
    expect(resOffer.body.offer_title).not.toEqual(offer.title);
  });
  /*test(`When update offer with wrong Id`, async () => {
    const resOffer = await request(app).put(`/api/offers/${WRONG_ID}`).send(newOffer);
    expect(resOffer.statusCode).toBe(HttpCode.NOT_FOUND);
  });*/
  test(`When not valid data sent`, async () => {
    const res = await request(app).get(`/api/offers`);
    const offer = res.body[0];
    const resOffer = await request(app).put(`/api/offers/${offer.id}`)
    .send({title: `New title`, description: `New description`});
    expect(resOffer.statusCode).toBe(HttpCode.BAD_REQUEST);
  });
});

//******************** */
describe(`POST routes api/offers`, () => {
  test(`When create comment status code should be 201, check properties`, async () => {
    const res = await request(app).get(`/api/offers`);
    const offer = res.body[0];
    const resComment = await request(app).post(`/api/offers/${offer.id}/comments`)
    .send(newComment);
    expect(resComment.statusCode).toBe(HttpCode.CREATED);
    //ниже ключ из базы данных, что-то делать с этим
    expect(resComment.body.comment_text).toEqual(newComment.text);
  });
  test(`When create offer status code should be 201, check properties`, async () => {
    const resOffer = await request(app).post(`/api/offers`).send(newOffer);
    expect(resOffer.statusCode).toBe(HttpCode.CREATED);
    //ниже исправлять: надо что-то делать, возвращаются ключи из базы данных
    expect(resOffer.body.offer_title).toEqual(newOffer.title);
  });
  /*test(`When create comment to offer with wrong Id`, async () => {
    const resComment = await request(app).post(`/api/offers/${WRONG_ID}/comments`)
    .send(newComment);
    expect(resComment.statusCode).toBe(HttpCode.NOT_FOUND);
  });*/

  test(`When not valid data sent`, async () => {
    const resOffer = await request(app).post(`/api/offers`)
    .send({title: `New title`, description: `New description`});
    expect(resOffer.statusCode).toBe(HttpCode.BAD_REQUEST);
  });
  test(`When not valid comment data sent`, async () => {
    const res = await request(app).get(`/api/offers`);
    const offer = res.body[0];
    const resComment = await request(app).post(`/api/offers/${offer.id}/comments`)
    .send({});
    expect(resComment.statusCode).toBe(HttpCode.BAD_REQUEST);
  });
});

describe(`DELETE routes api/offers`, () => {
  test(`When delete offer status code should be 204`, async () => {
    const res = await request(app).get(`/api/offers`);
    const id = res.body[0].id;
    const resOffer = await request(app).delete(`/api/offers/${id}`);
    expect(resOffer.statusCode).toBe(HttpCode.NO_CONTENT);
  });

  test(`When delete comment status code should be 204`, async () => {
    const res = await request(app).get(`/api/offers`);
    const id = res.body[0].id;
    const resComments = await request(app).get(`/api/offers/${id}/comments`);
    if (resComments.body.length > 0) {
      const commentId = resComments.body[0].id;
      const resDeleteComment = await request(app).delete(`/api/offers/${id}/comments/${commentId}`);
      expect(resDeleteComment.statusCode).toBe(HttpCode.NO_CONTENT);
    }
  });
  /*test(`When delete offer with wrong Id`, async () => {
    const resOffer = await request(app).delete(`/api/offers/${WRONG_ID}`);
    expect(resOffer.statusCode).toBe(HttpCode.NOT_FOUND);
  });*/

  /*test(`When delete comment with wrong offerId`, async () => {
    const resComments = await request(app).delete(`/api/offers/${WRONG_ID}/comments`);
    expect(resComments.statusCode).toBe(HttpCode.NOT_FOUND);
  });*/

  /*test(`When delete comment with wrong commentId`, async () => {
    const res = await request(app).get(`/api/offers`);
    const id = res.body[0].id;
    const resComment = await request(app).delete(`/api/offers/${id}/comments/${WRONG_ID}`);
    expect(resComment.statusCode).toBe(HttpCode.NOT_FOUND);
  });*/
});
