const express = require("express");

const app = express();
const mongoose = require("mongoose");

const { PORT = 3001 } = process.env;
const routes = require("./routes");

mongoose.connect(
  "mongodb://localhost:27017/wtwr_db",
  (r) => {
    console.log("Connected to DB", r);
  },
  (e) => {
    console.log("Error connecting to DB", e);
  },
);

app.use(express.json());

app.use((req, res, next) => {
  req.user = {
    _id: "652203690b06a4a0beb3f6b0",
  };
  next();
});

app.use(routes);

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});
