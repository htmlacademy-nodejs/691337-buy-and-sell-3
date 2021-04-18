'use strict';
process.argv.push(`--server`);

const request = require(`supertest`);
const nanoid = require(`nanoid`);
const app = require(`../cli/app`);
const {HttpCode, RegisterMessage, LoginMessage} = require(`../../constants`);

const newEmail = nanoid(6);

const newUser = {
  valid: {
    userName: `Viktor`,
    email: `${newEmail}@gn.com.ua`,
    pass: `123456`,
    repeatPass: `123456`,
    avatar: `item12.jpg`
  },
  notValid: {
    userName: `Viktor&<>`,
    email: `vik@gn`,
    pass: `12345`,
    repeatPass: `1234567`,
    avatar: ``
  }
};

const errorsList = [
  RegisterMessage.WRONG_USERNAME,
  RegisterMessage.WRONG_EMAIL,
  RegisterMessage.MIN_PASSWORD_LENGTH,
  RegisterMessage.PASSWORDS_NOT_EQUAL,
  RegisterMessage.AVATAR_EMPTY_VALUE
];

test(`When create user status code should be 201`, async () => {
  const res = await request(app).post(`/api/user`).send(newUser.valid);
  expect(res.statusCode).toBe(HttpCode.CREATED);
});
test(`When create user with an existing email status code should be 400`, async () => {
  const res = await request(app).post(`/api/user`).send(newUser.valid);
  expect(res.statusCode).toBe(HttpCode.BAD_REQUEST);
  expect(res.body).toEqual([RegisterMessage.USER_ALREADY_REGISTER]);
});
test(`When not valid data sent`, async () => {
  const res = await request(app).post(`/api/user`)
  .send(newUser.notValid);
  expect(res.statusCode).toBe(HttpCode.BAD_REQUEST);
  expect(res.body).toEqual(errorsList);
});
test(`When login user status code should be 201`, async () => {
  const res = await request(app).post(`/api/user/login`).send({
    email: newUser.valid.email,
    pass: newUser.valid.pass
  });
  expect(res.statusCode).toBe(HttpCode.OK);
});
test(`When not correct login data sent`, async () => {
  const res = await request(app).post(`/api/user/login`).send({
    email: newUser.notValid.email,
    pass: newUser.notValid.pass
  });
  expect(res.body).toEqual([LoginMessage.USER_NOT_EXISTS]);
});
test(`When not correct password sent`, async () => {
  const res = await request(app).post(`/api/user/login`).send({
    email: newUser.valid.email,
    pass: newUser.notValid.pass
  });
  expect(res.body).toEqual([LoginMessage.WRONG_PASSWORD]);
});

