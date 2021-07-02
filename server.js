const dotenv = require("dotenv");
const app = require("./app");

const mongoose = require("mongoose");

process.on('uncaughtException', err => {
  console.log(err.name, err.message);

  process.exit(1);
});

dotenv.config({ path: "./config.env" });

const port = process.env.PORT || 8000;

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log("DB connection successful"));

const server = app.listen(port, () => {
  console.log(`App running on port ${port}`);
}); // start the server

process.on('unhandledRejection', err => {
  console.log(err.name, err.message);

  server.close(() => {
    process.exit(1);
  });
});