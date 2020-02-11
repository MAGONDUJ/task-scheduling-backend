require("dotenv").config();
const port = process.env.PORT || 2095;
const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const passport = require("passport");
const chalk = require("chalk");
const cors = require("cors");
const compression = require("compression"); // Compression middleware, compress responses from all routes
const helmet = require("helmet"); // Protect against web vunerablities

const routes = require("./routes");

// Database
const db = require("./config/database");

// Test DB
db.authenticate()
  .then(() => console.log("Database connected..."))
  .catch(err => console.log("Error: " + err));
db.sync()
  .then(() =>
    console.log(chalk.blueBright("<---------All Models sync-------->"))
  )
  .catch(err => console.log("Error: " + err));

const swaggerUi = require("swagger-ui-express"),
  swaggerDocument = require("./swagger.json");

const app = express();
app.use(compression());
app.use(helmet());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

const swaggerOptions = {
  explorer: false,
  DEFAULT_MODELS_EXPAND_DEPTH: -1,
  DEFAULT_MODEL_EXPAND_DEPTH: -1
};
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument, swaggerOptions)
);

//Register routes here
app.use("/personnel", routes.personnel);
//app.use("/tasks", routes.tasks);

app.listen(port, () => {
  console.log(
    chalk.blue(`All systems go. We are ready to take off on port ${port}`)
  );
  console.log(chalk.yellow(`   Connecting to Sequelize...`));
});
module.exports = app;
