const mongoose = require('mongoose');

const pizzaSchema = new mongoose.Schema({
  flavor: String,
  description: String,
  price: Number,
});

const Pizza = mongoose.model('Pizza', pizzaSchema);

module.exports = Pizza;
