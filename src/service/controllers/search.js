'use strict';

const {data, getData, routeMethod} = require(`../../storage`);

const checkData = async () => {

  if (!routeMethod.isLoaded) {
    await getData();
    routeMethod.isLoaded = true;
  }

};

module.exports.getSearch = async (req, res) => {
  await checkData();
  const matchedOffers = routeMethod.getMatchedOffers(data, req.query);
  return res.json(matchedOffers);
};

