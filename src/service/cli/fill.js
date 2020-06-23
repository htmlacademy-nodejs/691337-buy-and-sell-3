'use strict';

const fs = require(`fs`).promises;
const nanoid = require(`nanoid`);

const {getLogger} = require(`../../logger`);
const {getRandomInt, shuffle} = require(`../../utils`);

const FILE_PATH_SENTENCES = `./data/sentences.txt`;
const FILE_PATH_TITLES = `./data/titles.txt`;
const FILE_PATH_CATEGORIES = `./data/categories.txt`;
const FILE_PATH_COMMENTS = `./data/comments.txt`;
const FILE_PATH_USERS = `./data/users.txt`;

const DEFAULT_COUNT = 5;
const FILE_NAME = `fill-db.sql`;
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

const generateOffersData = (amount, titles, sentences, users) => Array(amount).fill(``).map(() => {
  const picture = getImgFileName(getRandomInt(PictureRange.min, PictureRange.max));
  const title = titles[getRandomInt(0, titles.length - 1)];
  const createdDate = new Date(getRandomInt(DateRange.min, DateRange.max)).toISOString().split(`T`)[0];
  const sum = getRandomInt(SumRange.min, SumRange.max);
  const type = Object.keys(OfferType)[getRandomInt(0, Object.keys(OfferType).length - 1)];
  const descr = shuffle(sentences).slice(0, getRandomInt(1, 3)).join(` `);
  const userId = getRandomInt(START_INDEX, users.length);
  return `(DEFAULT, '${title}', '${createdDate}', '${picture}', ${sum}, '${type}', '${descr}', ${userId})`;
});

const generateUsersData = (users) => users.map((it) => {
  const [firstName, lastName, email] = it.split(`, `);
  const pass = nanoid(6);
  const avatar = getImgFileName(getRandomInt(PictureRange.min, PictureRange.max));
  return `(DEFAULT, '${firstName}', '${lastName}', '${email}', '${pass}', '${avatar}')`;
});

const generateCategoriesData = (categories) => categories.map((it) => {
  const picture = getImgFileName(getRandomInt(PictureRange.min, PictureRange.max));
  return `(DEFAULT, '${it}', '${picture}')`;
});

const generateCommentsData = (amount, comments, users) => Array(amount).fill(START_INDEX)
  .map((it, index) => {
    const offerIndex = it + index;
    const offerComments = generateRandomComments(comments);
    return offerComments
      .map((el) => `(DEFAULT, '${el}', ${offerIndex}, ${getRandomInt(START_INDEX, users.length)})`);
  })
  .flat();

const generateOffersCategoriesData = (amount, categories) => Array(amount).fill(START_INDEX)
  .map((it, index) => {
    const offerIndex = it + index;
    const offerCategories = generateRandomCategories(categories);
    return offerCategories
      .map((el) => `(${offerIndex}, ${el})`);
  })
  .flat();

module.exports = {
  name: `--fill`,
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

    const TablesSQL = [
      {
        name: `users`,
        data: generateUsersData(users),
      },
      {
        name: `offers`,
        data: generateOffersData(offerAmount, titles, sentences, users),
      },
      {
        name: `comments`,
        data: generateCommentsData(offerAmount, comments, users),
      },
      {
        name: `categories`,
        data: generateCategoriesData(categories),
      },
      {
        name: `offers_categories`,
        data: generateOffersCategoriesData(offerAmount, categories),
      },
    ];

    const content = TablesSQL.map((it) => {
      return `
    ---
    --- Data for table: ${it.name}; Type: TABLE DATA; Schema: public
    ---

    INSERT INTO ${it.name} VALUES
    ${it.data.join(`,\n    `)};
    `;
    }).join(` `);

    try {
      await fs.writeFile(FILE_NAME, content);
      logger.info(`Operation success. File created.`);
    } catch (err) {
      logger.error(`Can't write data to file...`);
    }
  },
};
