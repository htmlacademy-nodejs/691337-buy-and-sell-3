'use strict';

const {getData} = require(`../../utils`);

const FILENAME = `mocks.json`;

module.exports.getAll = async (req, res) => {
  const data = await getData(FILENAME);
  return res.json(data.map((it) => it.category)
  .flat()
  .reduce((acc, it) => !acc.includes(it) ? [...acc, it] : acc, []));
};

