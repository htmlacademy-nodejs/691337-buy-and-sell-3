'use strict';

const fs = require(`fs`).promises;
const chalk = require(`chalk`);
const {getRandomInt, shuffle} = require(`../../utils`);

const DEFAULT_COUNT = 1;
const FILE_NAME = `mocks.json`;

const TITLES = [
  `Продам книги Стивена Кинга`,
  `Продам новую приставку Sony Playstation 5`,
  `Продам отличную подборку фильмов на VHS`,
  `Куплю антиквариат`,
  `Куплю породистого кота`,
];

const SENTENCES = [
  `Товар в отличном состоянии.`,
  `Пользовались бережно и только по большим праздникам.`,
  `Продаю с болью в сердце...`,
  `Бонусом отдам все аксессуары.`,
  `Даю недельную гарантию.`,
  `Если товар не понравится — верну всё до последней копейки.`,
  `Это настоящая находка для коллекционера!`,
  `Если найдёте дешевле — сброшу цену.`,
  `Таких предложений больше нет!`,
  `При покупке с меня бесплатная доставка в черте города.`,
];

const CATEGORIES = [
  `Книги`,
  `Разное`,
  `Посуда`,
  `Игры`,
  `Животные`,
  `Журналы`,
];

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

const getImgFileName = (num) => num < 10 ? `item0${num}.jpg` : `item${num}.jpg`;

const createRandomOffer = () => {
  const offer = {
    title: TITLES[getRandomInt(0, TITLES.length - 1)],
    picture: getImgFileName(getRandomInt(PictureRange.min, PictureRange.max)),
    description: shuffle(SENTENCES).slice(0, getRandomInt(1, 5)).join(` `),
    type: Object.keys(OfferType)[getRandomInt(0, Object.keys(OfferType).length - 1)],
    category: Array(getRandomInt(1, 3)).fill(``)
      .map(() => CATEGORIES[getRandomInt(0, CATEGORIES.length - 1)])
      .reduce((acc, it) => !acc.includes(it) ? [...acc, it] : acc, []),
    sum: getRandomInt(SumRange.min, SumRange.max),
  };

  return offer;
};

const generateOffers = (amount) => Array(amount).fill({}).map(() => createRandomOffer());

module.exports = {
  name: `--generate`,
  async run(args) {
    const [amount] = args;
    const offerAmount = Number.parseInt(amount, 10) || DEFAULT_COUNT;

    if (offerAmount > 1000) {
      console.log(chalk.red(`Не больше 1000 объявлений`));
      return;
    }
    const content = JSON.stringify(generateOffers(offerAmount));

    try {
      await fs.writeFile(FILE_NAME, content);
      console.log(chalk.green(`Operation success. File created.`));
    } catch (err) {
      console.error(chalk.red(`Can't write data to file...`));
    }
  },
};
