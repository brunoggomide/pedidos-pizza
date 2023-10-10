const modelFactory = require('../models/ModelFactory'); // Importa a fábrica de modelos
const OrderObserver = require('../observers/OrderObserver'); // Importa o OrderObserver

class OrderFacade {
  constructor(orderObserver) {
    this.Order = modelFactory.getModel('Order'); // Obtém o modelo 'Order' da fábrica de modelos
    this.Customer = modelFactory.getModel('Customer'); // Obtém o modelo 'Customer' da fábrica de modelos
    this.Pizza = modelFactory.getModel('Pizza'); // Obtém o modelo 'Pizza' da fábrica de modelos
    this.orderObserver = orderObserver; // Define o observador de pedidos
  }

  async createOrder(orderData) {
    const { customer: customerId, pizzaIds } = orderData;
  
    try {
      // Buscar o cliente pelo ID
      const customer = await this.Customer.findById(customerId);
  
      if (!customer) {
        throw new Error('Cliente não encontrado');
      }
  
      // Buscar as pizzas pelo ID
      const pizzas = await Promise.all(pizzaIds.map(pizzaId => this.Pizza.findById(pizzaId)));
  
      // Verificar se todas as pizzas foram encontradas
      if (pizzas.some(pizza => !pizza)) {
        throw new Error('Uma ou mais pizzas não encontradas');
      }
  
      // Calcular o preço total de todas as pizzas
      const totalPrice = pizzas.reduce((total, pizza) => total + pizza.price, 0);
  
      // Criar o pedido
      const order = await this.Order.create({ customer, pizzas, totalPrice });
  
      // Notificar o observador de pedidos
      this.orderObserver.notify(order);
  
      return order;
    } catch (error) {
      console.error('Erro ao criar o pedido:', error); // Registra um erro se ocorrer uma exceção
      throw error;
    }
  }
  

  async updateOrder(orderId, updatedData) {
    try {
      const updatedOrder = await this.Order.findByIdAndUpdate(orderId, updatedData, { new: true });

      // Notificar o observador de pedidos
      this.orderObserver.notify(updatedOrder);

      return updatedOrder;
    } catch (error) {
      console.error('Erro ao atualizar o pedido:', error); // Registra um erro se ocorrer uma exceção
      throw error;
    }
  }

  async deleteOrder(orderId) {
    try {
      const deletedOrder = await this.Order.findByIdAndDelete(orderId);

      // Notificar o observador de pedidos
      this.orderObserver.notify(deletedOrder, 'excluído');

      return deletedOrder;
    } catch (error) {
      console.error('Erro ao excluir o pedido:', error); // Registra um erro se ocorrer uma exceção
      throw error;
    }
  }

  async getAllOrders() {
    try {
      const orders = await this.Order.find();
      return orders;
    } catch (error) {
      console.error('Erro ao buscar os pedidos:', error); // Registra um erro se ocorrer uma exceção
      throw error;
    }
  }

  async getOrderById(orderId) {
    try {
      const order = await this.Order.findById(orderId);
      return order;
    } catch (error) {
      console.error('Erro ao buscar o pedido:', error); // Registra um erro se ocorrer uma exceção
      throw error;
    }
  }

  async getPizzaById(pizzaId) {
    try {
      const pizza = await this.Pizza.findById(pizzaId);
      return pizza;
    } catch (error) {
      console.error('Erro ao buscar a pizza:', error); // Registra um erro se ocorrer uma exceção
      throw error;
    }
  }

  async getCustomerOrders(customerId) {
    try {
      const orders = await this.Order.find({ customer: customerId });

      const ordersWithDetails = await Promise.all(
        orders.map(async order => {
          const orderData = order.toObject();

          const detailedPizzas = await Promise.all(
            order.pizzas.map(async pizzaId => {
              const pizza = await this.Pizza.findById(pizzaId);
              return pizza.toObject();
            })
          );

          orderData.pizzas = detailedPizzas;
          return orderData;
        })
      );

      return ordersWithDetails;
    } catch (error) {
      console.error('Erro ao buscar os pedidos do cliente:', error); // Registra um erro se ocorrer uma exceção
      throw error;
    }
  }

  notify(order) {
    this.orderObserver.notify(order);
  }
}

module.exports = OrderFacade; // Exporta a classe OrderFacade
