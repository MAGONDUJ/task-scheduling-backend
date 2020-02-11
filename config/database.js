const Sequelize = require("sequelize");
console.log("DATABASE_URL:", process.env.DATABASE_URL);
if (process.env.DATABASE_URL) {
  module.exports = new Sequelize(process.env.DATABASE_URL, {
    dialect: "postgres",
    protocol: "postgres",
    dialectOptions: {
      ssl: true
    }
  });
} else {
  module.exports = new Sequelize(
    process.env.DB_DATABASE,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: process.env.DB_HOST,
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
}
