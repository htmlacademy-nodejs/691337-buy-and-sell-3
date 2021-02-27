'use strict';
process.argv.push(`--server`);
const request = require(`supertest`);
const app = require(`../cli/app`);
const {HttpCode, OfferMessage} = require(`../../constants`);

const WRONG_ID = `dZuF7ilQ61Dl`;

const newOffer = {
  valid: {
    description: `Никаких подвохов. Бонусом отдам все аксессуары. И кота впридачу`,
    picture: `item05.jpg`,
    category: [`Игры`, `Запчасти`],
    title: `Куплю йоркширского терьера`,
    type: `buy`,
    sum: `27683`
  },
  notValid: {
    description: `Никаких подвохов`,
    picture: `item05.jpg`,
    category: [],
    title: `Куплю`,
    type: `buy`,
    sum: `27`
  }
};

const newComment = {
  valid: {
    text: `А где блок питания? И как быстро сможете поставить?`
  },
  notValid: {
    text: ``
  }
};

const errorsList = [
  OfferMessage.MIN_TITLE_LENGTH,
  OfferMessage.MIN_DESCR_LENGTH,
  OfferMessage.CATEGORY_REQUIRED,
  OfferMessage.MIN_PRICE
];

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
  test(`When get offer with wrong Id`, async () => {
    const resOffer = await request(app).get(`/api/offers/${WRONG_ID}`);
    expect(resOffer.statusCode).toBe(HttpCode.NOT_FOUND);
  });
  test(`When get comments with wrong offerId`, async () => {
    const resComments = await request(app).get(`/api/offers/${WRONG_ID}/comments`);
    expect(resComments.statusCode).toBe(HttpCode.NOT_FOUND);
  });
});

describe(`PUT routes api/offers`, () => {
  test(`When update offer status code should be 200, check properties`, async () => {
    const res = await request(app).get(`/api/offers`);
    const offer = res.body[0];
    const resOffer = await request(app).put(`/api/offers/${offer.id}`).send(newOffer.valid);
    expect(resOffer.statusCode).toBe(HttpCode.OK);
    expect(resOffer.body.offerData.id).toEqual(offer.id);
  });
  test(`When update offer with wrong Id`, async () => {
    const resOffer = await request(app).put(`/api/offers/${WRONG_ID}`).send(newOffer);
    expect(resOffer.statusCode).toBe(HttpCode.NOT_FOUND);
  });
  test(`When not valid data sent`, async () => {
    const res = await request(app).get(`/api/offers`);
    const offer = res.body[0];
    const resOffer = await request(app).put(`/api/offers/${offer.id}`)
    .send(newOffer.notValid);
    expect(resOffer.statusCode).toBe(HttpCode.BAD_REQUEST);
    expect(resOffer.body).toEqual(errorsList);
  });
});

describe(`POST routes api/offers`, () => {
  test(`When create comment status code should be 201, check properties`, async () => {
    const res = await request(app).get(`/api/offers`);
    const offer = res.body[0];
    const resComment = await request(app).post(`/api/offers/${offer.id}/comments`)
    .send(newComment.valid);
    expect(resComment.statusCode).toBe(HttpCode.CREATED);
    expect(resComment.body.text).toEqual(newComment.valid.text);
  });
  test(`When create offer status code should be 201, check properties`, async () => {
    const resOffer = await request(app).post(`/api/offers`).send(newOffer.valid);
    expect(resOffer.statusCode).toBe(HttpCode.CREATED);
    expect(resOffer.body.offerData.title).toEqual(newOffer.valid.title);
  });
  test(`When create comment to offer with wrong Id`, async () => {
    const resComment = await request(app).post(`/api/offers/${WRONG_ID}/comments`)
    .send(newComment.valid);
    expect(resComment.statusCode).toBe(HttpCode.NOT_FOUND);
  });
  test(`When not valid data sent`, async () => {
    const resOffer = await request(app).post(`/api/offers`)
    .send(newOffer.notValid);
    expect(resOffer.statusCode).toBe(HttpCode.BAD_REQUEST);
    expect(resOffer.body).toEqual(errorsList);
  });
  test(`When not valid comment data sent`, async () => {
    const res = await request(app).get(`/api/offers`);
    const offer = res.body[0];
    const resComment = await request(app).post(`/api/offers/${offer.id}/comments`)
    .send(newComment.notValid);
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
  test(`When delete offer with wrong Id`, async () => {
    const resOffer = await request(app).delete(`/api/offers/${WRONG_ID}`);
    expect(resOffer.statusCode).toBe(HttpCode.NOT_FOUND);
  });
  test(`When delete comment with wrong commentId`, async () => {
    const res = await request(app).get(`/api/offers`);
    const id = res.body[0].id;
    const resComment = await request(app).delete(`/api/offers/${id}/comments/${WRONG_ID}`);
    expect(resComment.statusCode).toBe(HttpCode.NOT_FOUND);
  });
});
