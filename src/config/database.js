require('dotenv').config();

module.exports = {
  database: process.env.PG_DATABASE,
  define: {
    timestamps: process.env.PG_DEFINE_TIMESTAMPS,
    underscored: process.env.PG_DEFINE_UNDERSCORED,
    underscoredAll: process.env.PG_DEFINE_UNDERSCOREDALL,
  },
  dialect: process.env.PG_DIALECT,
  host: process.env.PG_HOST,
  logging: false,
  password: process.env.PG_PASSWORD,
  username: process.env.PG_USERNAME,
};
