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

module.exports.RegisterMessage = {
  USER_ALREADY_REGISTER: `Пользователь с таким email уже зарегистрирован`,
  REQUIRED_FIELD: `Поле обязательно для заполнения`,
  WRONG_EMAIL: `Некорректный email`,
  WRONG_USERNAME: `Имя не должно содержать цифр и специальных символов`,
  MIN_PASSWORD_LENGTH: `Пароль должен быть не меньше 6 символов`,
  PASSWORDS_NOT_EQUAL: `Пароли не совпадают`,
  AVATAR_EMPTY_VALUE: `Отсутствует аватар`
};
