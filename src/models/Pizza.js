const mongoose = require('mongoose');

const pizzaSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
});

const Pizza = mongoose.model('Pizza', pizzaSchema);

module.exports = Pizza;
