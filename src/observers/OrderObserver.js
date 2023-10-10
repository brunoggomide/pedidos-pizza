class OrderObserver {
  constructor() {
    this.observers = []; // Uma matriz para armazenar os observadores registrados
    this.logNotifications = true; // Uma bandeira para controlar o registro de notificações
  }

  subscribe(observer) {
    this.observers.push(observer); // Adiciona um observador à lista de observadores
  }

  unsubscribe(observer) {
    this.observers = this.observers.filter(obs => obs !== observer); // Remove um observador da lista
  }

  // Método chamado pelos observadores quando um pedido é atualizado
  update(order, action) {
    console.log(`Pedido ${order._id} foi ${action}.`); // Registra uma mensagem informando sobre a atualização do pedido
  }

  // Método para notificar todos os observadores sobre a atualização de um pedido
  notify(order) {
    if (this.logNotifications) {
      console.log(`Pedido ${order._id} foi atualizado.`); // Registra uma mensagem de notificação se a bandeira logNotifications estiver definida como verdadeira
    }
    this.observers.forEach(observer => observer.update(order)); // Notifica todos os observadores chamando seus métodos 'update' com o pedido atualizado
  }
}

module.exports = OrderObserver; // Exporta a classe OrderObserver para uso em outras partes do aplicativo
