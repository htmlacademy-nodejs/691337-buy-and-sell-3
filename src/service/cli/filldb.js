'use strict';

const fs = require(`fs`).promises;
const nanoid = require(`nanoid`);

const {getLogger} = require(`../../logger`);
const {getRandomInt, shuffle} = require(`../../utils`);
const {sequelize, initDb} = require(`../../../service/db`);

const FILE_PATH_SENTENCES = `./data/sentences.txt`;
const FILE_PATH_TITLES = `./data/titles.txt`;
const FILE_PATH_CATEGORIES = `./data/categories.txt`;
const FILE_PATH_COMMENTS = `./data/comments.txt`;
const FILE_PATH_USERS = `./data/users.txt`;

const DEFAULT_COUNT = 5;
const MS_IN_MONTH = 30 * 24 * 60 * 60 * 1000;
const MONTHS_AMOUNT = 3;
const START_INDEX = 1;

const logger = getLogger();

const OfferType = {
  offer: `offer`,
  sale: `sale`,
};

const SumRange = {
  min: 1000,
  max: 100000,
};

const DateRange = {
  min: Date.now() - MONTHS_AMOUNT * MS_IN_MONTH,
  max: Date.now(),
};

const PictureRange = {
  min: 1,
  max: 16,
};

const readContent = async (filepath) => {
  try {
    const content = await fs.readFile(filepath, `utf-8`);
    return content.trim().split(`\n`);
  } catch (err) {
    logger.error(err);
    return [];
  }
};

const getImgFileName = (num) => num < 10 ? `item0${num}.jpg` : `item${num}.jpg`;

const generateRandomCategories = (categories) => Array(getRandomInt(1, 3)).fill(``)
      .map(() => getRandomInt(START_INDEX, categories.length))
      .reduce((acc, it) => !acc.includes(it) ? [...acc, it] : acc, []);

const generateRandomComments = (comments) => Array(getRandomInt(2, 5)).fill(``)
      .map(() => comments[getRandomInt(0, comments.length - 1)])
      .reduce((acc, it) => !acc.includes(it) ? [...acc, it] : acc, []);

const generateOffersData = (amount, titles, sentences, users) => Array(amount).fill({}).map(() => ({
  'offer_title': titles[getRandomInt(0, titles.length - 1)],
  'created_date': new Date(getRandomInt(DateRange.min, DateRange.max)).toISOString().split(`T`)[0],
  'picture_name': getImgFileName(getRandomInt(PictureRange.min, PictureRange.max)),
  'price': getRandomInt(SumRange.min, SumRange.max),
  'offer_type': Object.keys(OfferType)[getRandomInt(0, Object.keys(OfferType).length - 1)],
  'description_text': shuffle(sentences).slice(0, getRandomInt(1, 3)).join(` `),
  'author_id': getRandomInt(START_INDEX, users.length),
}));

const generateUsersData = (users) => users.map((it) => {
  const [userName, email] = it.split(`, `);
  const pass = nanoid(6);
  const avatar = getImgFileName(getRandomInt(PictureRange.min, PictureRange.max));
  return {
    'user_name': userName,
    email,
    pass,
    avatar,
  };
});

const generateCategoriesData = (categories) => categories.map((it) => {
  const picture = getImgFileName(getRandomInt(PictureRange.min, PictureRange.max));
  return {
    'category_title': it,
    'picture_name': picture,
  };
});

const generateCommentsData = (amount, comments, users) => Array(amount).fill(START_INDEX)
  .map((it, index) => {
    const offerIndex = it + index;
    const offerComments = generateRandomComments(comments);
    return offerComments
      .map((el) => ({
        'comment_text': el,
        'offer_id': offerIndex,
        'author_id': getRandomInt(START_INDEX, users.length)
      }));
  })
  .flat();

module.exports = {
  name: `--filldb`,
  async run(args) {
    const [titles, categories, sentences, comments, users] = await Promise.all([
      readContent(FILE_PATH_TITLES),
      readContent(FILE_PATH_CATEGORIES),
      readContent(FILE_PATH_SENTENCES),
      readContent(FILE_PATH_COMMENTS),
      readContent(FILE_PATH_USERS)
    ]);

    const [amount] = args;
    const offerAmount = Number.parseInt(amount, 10) || DEFAULT_COUNT;

    if (offerAmount > 1000) {
      logger.info(`Не больше 1000 объявлений`);
      return;
    }

    const usersData = generateUsersData(users);
    const offersData = generateOffersData(offerAmount, titles, sentences, users);
    const commentsData = generateCommentsData(offerAmount, comments, users);
    const categoriesData = generateCategoriesData(categories);

    await initDb(usersData, offersData, commentsData, categoriesData, generateRandomCategories);
    await sequelize.close();
  },
};
