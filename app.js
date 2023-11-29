const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const errorHandler = require("./middlewares/errorHandler");
const { errors } = require("celebrate");

const app = express();
app.use(cors());

const { PORT = 3001 } = process.env;
const routes = require("./routes");

mongoose.connect(
  "mongodb://127.0.0.1:27017/wtwr_db",
  (r) => {
    console.log("Connected to database", r);
  },
  (e) => {
    console.log("Error connecting to database", e);
  },
);

app.use(express.json());

app.use(routes);

app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});
