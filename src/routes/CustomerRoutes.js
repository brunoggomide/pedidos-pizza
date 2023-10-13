const express = require('express');
const CustomerFacade = require('../facades/CustomerFacade'); // Importa a fachada de clientes (CustomerFacade)
const OrderFacade = require('../facades/OrderFacade'); // Importa a fachada de pedidos (OrderFacade)

function CustomerRoutes() {
  const router = express.Router();
  const customerFacade = new CustomerFacade(); // Cria uma instância da fachada de clientes (CustomerFacade)
  const orderFacade = new OrderFacade(); // Cria uma instância da fachada de pedidos (OrderFacade)

  // Rota para criar um novo cliente
  router.post('/customers', async (req, res) => {
    const customerData = req.body;
  
    // Validação dos dados do cliente antes de criar o cliente
    const { name, table } = customerData;
  
    // Verifica se os campos obrigatórios foram fornecidos
    if (!name || !table) {
      return res.status(400).json({ error: 'Campos obrigatórios ausentes' });
    }
  
    // Adicione mais regras de validação conforme necessário
  
    try {
      const customer = await customerFacade.createCustomer(customerData);
      res.status(201).json(customer);
    } catch (error) {
      console.error('Erro ao criar o cliente:', error);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  });

  // Rota para obter todos os clientes
  router.get('/customers', async (req, res) => {
    try {
      const customers = await customerFacade.getAllCustomers();
      const customersWithOrders = await Promise.all(customers.map(async customer => {
        const customerData = customer.toObject();
        const customerOrders = await customerFacade.getCustomerOrders(customerData._id);
  
        // Obtém informações detalhadas da pizza para cada pedido
        const ordersWithPizzas = await Promise.all(customerOrders.map(async order => {
          const orderData = order.toObject();
          const detailedPizzas = await Promise.all(order.pizzas.map(async pizzaId => {
            const pizza = await orderFacade.getPizzaById(pizzaId); // <-- Erro aqui
            return pizza.toObject();
          }));
          orderData.pizzas = detailedPizzas;
          return orderData;
        }));
  
        customerData.orders = ordersWithPizzas;
        return customerData;
      }));
      res.json(customersWithOrders);
    } catch (error) {
      console.error('Erro ao buscar os clientes:', error);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  });

  // Rota para obter um cliente específico por ID
  router.get('/customers/:customerId', async (req, res) => {
    try {
      const customerId = req.params.customerId;
      const customer = await customerFacade.getCustomerById(customerId);
      if (!customer) {
        return res.status(404).json({ message: 'Cliente não encontrado' });
      }
      res.json(customer);
    } catch (error) {
      console.error('Erro ao buscar o cliente:', error);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  });

  // Rota para obter todos os pedidos de um cliente específico
  router.get('/customers/:customerId/orders', async (req, res) => {
    try {
      const customerId = req.params.customerId;
      const customerOrders = await customerFacade.getCustomerOrders(customerId);
      res.json(customerOrders);
    } catch (error) {
      console.error('Erro ao buscar os pedidos do cliente:', error);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  });

  // Rota para atualizar um cliente por ID
  router.put('/customers/:customerId', async (req, res) => {
    const customerId = req.params.customerId;
    const updatedData = req.body;
  
    // Validação dos dados atualizados antes de atualizar o cliente
    const { name, table } = updatedData;
  
    // Verifica se pelo menos um campo foi fornecido para a atualização
    if (!name && !table) {
      return res.status(400).json({ error: 'Nenhum dado de atualização válido fornecido' });
    }
  
    // Adicione mais regras de validação conforme necessário
  
    try {
      const updatedCustomer = await customerFacade.updateCustomer(customerId, updatedData);
      if (!updatedCustomer) {
        return res.status(404).json({ message: 'Cliente não encontrado' });
      }
      res.json(updatedCustomer);
    } catch (error) {
      console.error('Erro ao atualizar o cliente:', error);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  });

  // Rota para excluir um cliente por ID
  router.delete('/customers/:customerId', async (req, res) => {
    try {
      const customerId = req.params.customerId;
      const deletedCustomer = await customerFacade.deleteCustomer(customerId);
      if (!deletedCustomer) {
        return res.status(404).json({ message: 'Cliente não encontrado' });
      }
      res.json({ message: 'Cliente excluído com sucesso' });
    } catch (error) {
      console.error('Erro ao excluir o cliente:', error);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  });

  return router;
}

module.exports = CustomerRoutes;
