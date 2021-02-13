'use strict';

const axios = require(`axios`);
const bcrypt = require(`bcrypt`);
const path = require(`path`);
const multer = require(`multer`);
const jwt = require(`jsonwebtoken`);
const nanoid = require(`nanoid`);
const {HttpCode} = require(`./constants`);
const {getLogger} = require(`./logger`);
const logger = getLogger();

const saltRounds = 10;

const JWT_ACCESS_SECRET = `secret`;
const JWT_REFRESH_SECRET = `secret-refresh`;

const UPLOAD_DIR = `./express/upload/img`;
const uploadDirAbsolute = path.resolve(__dirname, UPLOAD_DIR);
const FileType = [`image/png`, `image/jpg`, `image/jpeg`];

const storage = multer.diskStorage({
  destination: uploadDirAbsolute,
  filename: (req, file, cb) => {
    const uniqueName = nanoid(10);
    const extension = file.originalname.split(`.`).pop();
    cb(null, `${uniqueName}.${extension}`);
  }
});
const fileFilter = (req, file, cb) => {
  if (FileType.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

module.exports.getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

module.exports.shuffle = (someArray) => {
  for (let i = someArray.length - 1; i > 0; i--) {
    const randomPosition = Math.floor(Math.random() * i);
    [someArray[i], someArray[randomPosition]] = [someArray[randomPosition], someArray[i]];
  }

  return someArray;
};

module.exports.getData = async (dataPath, cookies = ``) => {
  try {
    const content = await axios.get(dataPath, {
      headers: {
        Cookie: cookies
      }
    });
    return content.data;
  } catch (err) {
    logger.error(`Error: ${err.message}`);
    throw err;
  }
};

module.exports.renderError = (errStatus, res) => {

  if (errStatus >= HttpCode.INTERNAL_SERVER_ERROR) {
    res.status(errStatus).render(`errors/500`);
  } else {
    res.status(errStatus).render(`errors/400`);
  }
};

module.exports.getPassHashSum = async (pass) => {
  const hash = await bcrypt.hash(pass, saltRounds);
  return hash;
};

module.exports.comparePassHashSum = async (user, pass) => {
  const match = await bcrypt.compare(pass, user.password);
  return match;
};

module.exports.makeTokens = (tokenData) => {
  const accessToken = jwt.sign(tokenData, JWT_ACCESS_SECRET, {expiresIn: `50s`});
  const refreshToken = jwt.sign(tokenData, JWT_REFRESH_SECRET);
  return {accessToken, refreshToken};
};

module.exports.upload = multer({
  storage,
  fileFilter
});
