const express = require("express");
const app = express();
const mongoose = require("mongoose");
const { PORT = 3001 } = process.env;
const users = require('./routes/users');
const clothingItems = require('./routes/clothingItems');
const routes = require('./routes');

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

app.use(routes);

// app.use(users);
// app.use(clothingItems);

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});
