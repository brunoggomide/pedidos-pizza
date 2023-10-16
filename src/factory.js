const Customer = require("./models/customer");
const Order = require("./models/order");
const Pizza = require("./models/Pizza");

class Factory {
  create(type, ...args) {
    switch (type) {
      case "customer":
        return new Customer(...args);
      case "order":
        return new Order(...args);
      case "pizza":
        return new Pizza(...args);
      default:
        throw new Error(`Tipo desconhecido: ${type}`);
    }
  }
}

module.exports = new Factory();
