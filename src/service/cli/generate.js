'use strict';

const fs = require(`fs`).promises;
const chalk = require(`chalk`);
const {getRandomInt, shuffle} = require(`../../utils`);

const FILE_PATH_SENTENCES = `./data/sentences.txt`;
const FILE_PATH_TITLES = `./data/titles.txt`;
const FILE_PATH_CATEGORIES = `./data/categories.txt`;


const DEFAULT_COUNT = 1;
const FILE_NAME = `mocks.json`;

const OfferType = {
  offer: `offer`,
  sale: `sale`,
};

const SumRange = {
  min: 1000,
  max: 100000,
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
    console.error(chalk.red(err));
    return [];
  }
};

const getImgFileName = (num) => num < 10 ? `item0${num}.jpg` : `item${num}.jpg`;

const generateOffers = (amount, titles, categories, sentences) => Array(amount).fill({}).map(() => ({
  title: titles[getRandomInt(0, titles.length - 1)],
  picture: getImgFileName(getRandomInt(PictureRange.min, PictureRange.max)),
  description: shuffle(sentences).slice(0, getRandomInt(1, 5)).join(` `),
  type: Object.keys(OfferType)[getRandomInt(0, Object.keys(OfferType).length - 1)],
  category: Array(getRandomInt(1, 3)).fill(``)
      .map(() => categories[getRandomInt(0, categories.length - 1)])
      .reduce((acc, it) => !acc.includes(it) ? [...acc, it] : acc, []),
  sum: getRandomInt(SumRange.min, SumRange.max),
}));

module.exports = {
  name: `--generate`,
  async run(args) {
    const [titles, categories, sentences] = await Promise.all([
      readContent(FILE_PATH_TITLES),
      readContent(FILE_PATH_CATEGORIES),
      readContent(FILE_PATH_SENTENCES)
    ]);

    const [amount] = args;
    const offerAmount = Number.parseInt(amount, 10) || DEFAULT_COUNT;

    if (offerAmount > 1000) {
      console.log(chalk.red(`Не больше 1000 объявлений`));
      return;
    }
    const content = JSON.stringify(generateOffers(offerAmount, titles, categories, sentences));

    try {
      await fs.writeFile(FILE_NAME, content);
      console.log(chalk.green(`Operation success. File created.`));
    } catch (err) {
      console.error(chalk.red(`Can't write data to file...`));
    }
  },
};
