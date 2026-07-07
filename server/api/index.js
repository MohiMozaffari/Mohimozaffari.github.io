require('dotenv').config();
const connectDB = require('../src/config/db');
const app = require('../src/app');

let dbPromise;

module.exports = async (req, res) => {
  if (!dbPromise) {
    dbPromise = connectDB().catch((err) => {
      dbPromise = null;
      throw err;
    });
  }
  await dbPromise;
  return app(req, res);
};
