const express = require('express');
const app = express();
const mongoose = require('mongoose');
const { PORT = 3001 } = process.env;

const userRoute = require('./routes/users');
const itemRoute = require('./routes/clothingItems');

app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/wtwr_db', (r) => {
  console.log('Connected to DB', r);
}, (e) => {
  console.log('DB error', e);
});

app.use(userRoute);
app.use(itemRoute);


app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
  console.log("This is working");
});
