const Pizza = require('../models/Pizza');

class PizzaFactory {
    createPizza(flavor, description, price) {
        return new Pizza({ flavor, description, price });
    }
}

module.exports = new PizzaFactory();
