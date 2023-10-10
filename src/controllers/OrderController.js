const modelFactory = require('../models/ModelFactory'); // Importa a fábrica de modelos
const OrderObserver = require('../observers/OrderObserver'); // Importa o OrderObserver

class OrderController {
  constructor() {
    this.Order = modelFactory.getModel('Order'); // Obtém o modelo 'Order' da fábrica de modelos
    const orderObserver = new OrderObserver(); // Cria uma instância do OrderObserver
    this.orderObserver = orderObserver; // Atribui a instância do OrderObserver ao membro de classe orderObserver
  }

  async createOrder(orderData) {
    try {
      const order = await this.Order.create(orderData); // Cria um pedido com os dados fornecidos
      this.orderObserver.notify(order, 'created'); // Notifica os observadores quando um pedido é criado
      console.log(orderObserver.logNotifications); // Registra as notificações do OrderObserver
      return order;
    } catch (error) {
      console.error('Erro ao criar o pedido:', error); // Registra um erro se ocorrer uma exceção
      throw error;
    }
  }

  async getAllOrders() {
    try {
      const orders = await this.Order.find(); // Obtém todos os pedidos
      return orders;
    } catch (error) {
      console.error('Erro ao buscar os pedidos:', error); // Registra um erro se ocorrer uma exceção
      throw error;
    }
  }

  async getOrderById(orderId) {
    try {
      const order = await this.Order.findById(orderId); // Obtém um pedido pelo ID
      return order;
    } catch (error) {
      console.error('Erro ao buscar o pedido:', error); // Registra um erro se ocorrer uma exceção
      throw error;
    }
  }

  async updateOrder(orderId, updatedData) {
    try {
      const updatedOrder = await this.Order.findByIdAndUpdate(orderId, updatedData, { new: true }); // Atualiza um pedido pelo ID com os dados atualizados
      this.orderObserver.notify(updatedOrder); // Notifica os observadores quando um pedido é atualizado
      return updatedOrder;
    } catch (error) {
      console.error('Erro ao atualizar o pedido:', error); // Registra um erro se ocorrer uma exceção
      throw error;
    }
  }

  async deleteOrder(orderId) {
    try {
      const deletedOrder = await this.Order.findByIdAndDelete(orderId); // Exclui um pedido pelo ID
      this.orderObserver.notify(deletedOrder, 'deleted'); // Notifica os observadores quando um pedido é excluído
      return deletedOrder;
    } catch (error) {
      console.error('Erro ao excluir o pedido:', error); // Registra um erro se ocorrer uma exceção
      throw error;
    }
  }

}

module.exports = new OrderController(); // Exporta uma instância do OrderController
