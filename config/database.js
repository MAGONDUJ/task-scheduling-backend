const Sequelize = require("sequelize");

module.exports = new Sequelize(
  process.env.DB_DATABASE,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host:
      process.env.DB_HOST ||
      "postgres://dkpvdmpgsghonf:a532fe5991ed58a6a49116d7da50faf6a05adfbea6ad443a93b0a033d1f1e86e@ec2-54-197-34-207.compute-1.amazonaws.com:5432/d3jpkv7qc32oic",
    dialect: "postgres",
    operatorsAliases: false,

    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
);
