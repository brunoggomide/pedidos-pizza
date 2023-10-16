const Order = require("../models/order");

class OrderFacade {
  createOrder(data) {
    const order = new Order(data);
    return order.save();
  }

  getAllOrders() {
    return Order.find().populate("customer pizzas");
  }

  getOrderById(id) {
    return Order.findById(id).populate("customer pizzas");
  }

  updateOrderById(id, data) {
    return Order.findByIdAndUpdate(id, data, { new: true }).populate(
      "customer pizzas"
    );
  }

  deleteOrderById(id) {
    return Order.findByIdAndRemove(id).populate("customer pizzas");
  }
}

module.exports = new OrderFacade();
