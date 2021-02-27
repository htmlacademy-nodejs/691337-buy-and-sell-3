'use strict';

module.exports.USER_ARGV_INDEX = 2;
module.exports.URL = `http://localhost:3000/api`;
module.exports.DEFAULT_COMMAND = `--help`;
module.exports.DefaultData = {
  picture: `blank.png`,
};
module.exports.ExitCode = {
  error: 1,
  success: 0,
};
module.exports.HttpCode = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
  FORBIDDEN: 403,
  UNAUTHORIZED: 401,
  BAD_REQUEST: 400,
};

module.exports.OfferMessage = {
  REQUIRED_FIELD: `Поле обязательно для заполнения`,
  MIN_TITLE_LENGTH: `Название должно быть не меньше 10 символов`,
  MAX_TITLE_LENGTH: `Название должно быть не больше 100 символов`,
  MIN_DESCR_LENGTH: `Описание должно быть не меньше 50 символов`,
  MAX_DESCR_LENGTH: `Описание должно быть не больше 1000 символов`,
  MIN_PRICE: `Цена должна быть не меньше 100`,
  CATEGORY_REQUIRED: `Необходимо выбрать минимум 1 категорию`
};

module.exports.RegisterMessage = {
  USER_ALREADY_REGISTER: `Пользователь с таким email уже зарегистрирован`,
  REQUIRED_FIELD: `Поле обязательно для заполнения`,
  WRONG_EMAIL: `Некорректный email`,
  WRONG_USERNAME: `Имя не должно содержать цифр и специальных символов`,
  MIN_PASSWORD_LENGTH: `Пароль должен быть не меньше 6 символов`,
  PASSWORDS_NOT_EQUAL: `Пароли не совпадают`,
  AVATAR_EMPTY_VALUE: `Отсутствует аватар`
};

module.exports.LoginMessage = {
  USER_NOT_EXISTS: `Пользователь с таким email не зарегистрирован`,
  WRONG_PASSWORD: `Неверный логин или пароль`
};

