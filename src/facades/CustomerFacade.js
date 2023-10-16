const Customer = require('../models/customer');

class CustomerFacade {
  createCustomer(data) {
    const customer = new Customer(data);
    return customer.save();
  }

  getAllCustomers() {
    return Customer.find();
  }

  getCustomerById(id) {
    return Customer.findById(id);
  }

  updateCustomerById(id, data) {
    return Customer.findByIdAndUpdate(id, data, { new: true });
  }

  deleteCustomerById(id) {
    return Customer.findByIdAndRemove(id);
  }
}

module.exports = new CustomerFacade();
