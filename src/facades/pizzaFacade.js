const Pizza = require('../models/Pizza');

class PizzaFacade {
  createPizza(data) {
    const pizza = new Pizza(data);
    return pizza.save();
  }

  getAllPizzas() {
    return Pizza.find();
  }

  getPizzaById(id) {
    return Pizza.findById(id);
  }

  updatePizzaById(id, data) {
    return Pizza.findByIdAndUpdate(id, data, { new: true });
  }

  deletePizzaById(id) {
    return Pizza.findByIdAndRemove(id);
  }
}

module.exports = new PizzaFacade();
