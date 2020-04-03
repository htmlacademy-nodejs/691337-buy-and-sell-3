'use strict';

const {data, getData, routeMethod} = require(`../../storage`);

const checkData = async () => {

  if (!routeMethod.isLoaded) {
    await getData();
    routeMethod.isLoaded = true;
  }

};

module.exports.getAll = async (req, res) => {
  await checkData();
  const categories = routeMethod.getCategories(data);
  return res.json(categories);
};
