'use strict';

const {Sequelize, DataTypes, Model, Op} = require(`sequelize`);
const {DB_HOST, DB_USER, DB_NAME, DB_PASS, DB_DIALECT} = require(`./config`);
const getUser = require(`./models/user`);
const getOffer = require(`./models/offer`);
const getComment = require(`./models/comment`);
const getCategory = require(`./models/category`);
const {getLogger} = require(`../src/logger`);

const logger = getLogger();

const sequelize = new Sequelize(
    DB_NAME,
    DB_USER,
    DB_PASS,
    {
      host: DB_HOST,
      dialect: DB_DIALECT,
    });

const User = getUser(sequelize, DataTypes, Model);
const Offer = getOffer(sequelize, DataTypes, Model);
const Comment = getComment(sequelize, DataTypes, Model);
const Category = getCategory(sequelize, DataTypes, Model);

User.hasMany(Offer, {
  as: `offers`,
  foreignKey: `author_id`,
});

User.hasMany(Comment, {
  as: `comments`,
  foreignKey: `author_id`,
});

Offer.hasMany(Comment, {
  as: `comments`,
  foreignKey: `offer_id`,
});

Offer.belongsTo(User, {
  as: `author`,
  foreignKey: `author_id`,
});

Offer.belongsToMany(Category, {
  through: `offer_category`,
  as: `categories`,
  foreignKey: `offer_id`,
  timestamps: false,
  paranoid: false,
});

Category.belongsToMany(Offer, {
  through: `offer_category`,
  as: `offers`,
  foreignKey: `category_id`,
});

Comment.belongsTo(User, {
  as: `author`,
  foreignKey: `author_id`,
});

Comment.belongsTo(Offer, {
  as: `offer`,
  foreignKey: `offer_id`,
});

const connectDb = async () => {
  try {
    logger.info(`Starting connection to database ${DB_NAME}`);
    await sequelize.authenticate();
    logger.info(`Database connection successful`);
  } catch (err) {
    logger.error(`Connection error: ${err}`);
  }
};

const initDb = async (users, offers, comments, categories, fn) => {
  try {
    await sequelize.sync({force: true});
    logger.info(`Database structure created successful`);
    await User.bulkCreate(users);
    await Offer.bulkCreate(offers);
    await Comment.bulkCreate(comments);
    await Category.bulkCreate(categories);

    const allOffers = await Offer.findAll({raw: true});
    const getRandomCategories = async (array) => {
      const randomCategories = await Category.findAll({
        where: {
          'category_id': {
            [Op.in]: array
          }
        }
      });
      return randomCategories;
    };

    for (let i = 1; i <= allOffers.length; i += 1) {
      const currentOffer = await Offer.findByPk(i);
      await currentOffer.addCategories(await getRandomCategories(fn(categories)));
    }

  } catch (err) {
    logger.error(`Tables not created: ${err}`);
  }
};

module.exports = {
  User,
  Offer,
  Comment,
  Category,
  connectDb,
  initDb,
  sequelize
};
