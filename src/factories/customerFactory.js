const Customer = require('../models/Customer');

class CustomerFactory {
    createCustomer(name, table) {
        return new Customer({ name, table });
    }
}

module.exports = new CustomerFactory();
