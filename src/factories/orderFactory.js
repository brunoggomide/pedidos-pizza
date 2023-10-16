const Order = require('../models/Order');

class OrderFactory {
    createOrder(customerId, pizzaIds, status) {
        return new Order({ customer: customerId, pizzas: pizzaIds, status });
    }
}

module.exports = new OrderFactory();
