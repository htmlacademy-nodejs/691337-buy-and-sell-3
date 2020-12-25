'use strict';
process.argv.push(`--server`);

const request = require(`supertest`);
const nanoid = require(`nanoid`);
const app = require(`../cli/app`);
const {HttpCode, RegisterMessage} = require(`../../constants`);

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
  `Имя не должно содержать цифр и специальных символов`,
  `Некорректный email`,
  `Пароль должен быть не меньше 6 символов`,
  `Пароли не совпадают`,
  `Отсутствует аватар`
];

test(`When create user status code should be 201`, async () => {
  const res = await request(app).post(`/api/user`).send(newUser.valid);
  expect(res.statusCode).toBe(HttpCode.CREATED);
});
test(`When create user with an existing email status code should be 200`, async () => {
  const res = await request(app).post(`/api/user`).send(newUser.valid);
  expect(res.statusCode).toBe(HttpCode.OK);
  expect(res.body).toEqual(RegisterMessage.USER_ALREADY_REGISTER);
});
test(`When not valid data sent`, async () => {
  const res = await request(app).post(`/api/user`)
  .send(newUser.notValid);
  expect(res.statusCode).toBe(HttpCode.BAD_REQUEST);
  expect(res.body.notValid).toEqual(errorsList);
});

