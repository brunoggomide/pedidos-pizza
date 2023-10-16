const express = require('express');
const CustomerFacade = require('../facades/customerFacade');
const Factory = require('../factory'); 

function CustomerRoutes() {
  const router = express.Router();

  router.post('/customers', async (req, res) => {
    try {
      const { name, table } = req.body;
      const customerData = { name, table };
      const newCustomer = Factory.create('customer', customerData);
      await CustomerFacade.createCustomer(newCustomer);
      res.json({ message: 'Cliente criado com sucesso' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
});


  router.get('/customers', async (req, res) => {
    try {
      const customers = await CustomerFacade.getAllCustomers();
      res.json(customers);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  router.get('/customers/:id', async (req, res) => {
    try {
      const customerId = req.params.id;
      const customer = await CustomerFacade.getCustomerById(customerId);
      if (!customer) {
        res.status(404).json({ message: 'Cliente não encontrado' });
      } else {
        res.json(customer);
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  router.put('/customers/:id', async (req, res) => {
    try {
      const customerId = req.params.id;
      const { name, table } = req.body;
      const updatedCustomer = await CustomerFacade.updateCustomerById(customerId, { name, table });
      if (!updatedCustomer) {
        res.status(404).json({ message: 'Cliente não encontrado' });
      } else {
        res.json({ message: 'Cliente atualizado com sucesso' });
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  router.delete('/customers/:id', async (req, res) => {
    try {
      const customerId = req.params.id;
      const deletedCustomer = await CustomerFacade.deleteCustomerById(customerId);
      if (!deletedCustomer) {
        res.status(404).json({ message: 'Cliente não encontrado' });
      } else {
        res.json({ message: 'Cliente excluído com sucesso' });
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  return router;
}

module.exports = CustomerRoutes;
