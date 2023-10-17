const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const PizzaRoutes = require("./src/routes/pizzaRoutes");
const PizzaFacade = require("./src/facades/pizzaFacade");
const CustomerRoutes = require("./src/routes/CustOmerRoutes");
const CustomerFacade = require("./src/facades/customerFacade");
const OrderRoutes = require("./src/routes/orderRoutes");
const OrderFacade = require("./src/facades/orderFacade");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./src/swagger/swagger-config.js");

const app = express();
const PORT = process.env.PORT || 3001;
dotenv.config({ path: "./.env" });

const dbHostConnect = process.env.DB_HOST_CONNECT;

app.use(cors());

mongoose
  .connect(dbHostConnect, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Conexão com o MongoDB estabelecida");
  })
  .catch((err) => {
    console.error("Erro ao conectar ao MongoDB:", err);
  });

app.use(express.json());

// Implementação das rotas para pedidos
app.use("/api", PizzaRoutes(PizzaFacade));
app.use("/api", CustomerRoutes(CustomerFacade));
app.use("/api", OrderRoutes(OrderFacade));
app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
