const express = require("express");
const cors = require("cors");
const ws = require("ws");
const app = express();
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || "192.168.0.22";

const clients = []; // Mantén un arreglo de clientes suscritos a EventSource
let notifications = [];
let orders = [];

let orderList = [
  {
    id: 1,
    orderNumber: 123456789,
    sapDistributor: 123456789,
    atCreatedDate: "19/04/2023",
    atCreatedTime: "19:00",
    distributorName: "San Juanito",
    deliveryMethod: "Despacho",
    deliveryDate: "Mañana (17/07/2024)",
    deliveryTime: "Tarde - 15:00 a 18:00hrs.",
    deliveryWarehouse: "Av. El Salto 7654, Recoleta",
    documentType: "Factura",
    paymentMethod: "Efectivo",
    orderStatus: "Pendiente",
    paymentStatus: "Pendiente",
    balance: 100000,
    payment: 100000,
    subtotal: 100000,
    total: 100000,
    products: [
      {
        id: 0,
        name: "Cilindro 5kg",
        amount: 10,
        totalWeight: 50,
        vouchers: 2,
        failed: 1,
        totalValue: 10000,
      },
      {
        id: 2,
        name: "Cilindro 15kg",
        amount: 10,
        totalWeight: 150,
        vouchers: 2,
        failed: 1,
        totalValue: 30000,
      },
      {
        id: 3,
        name: "Cilindro 45kg",
        amount: 10,
        totalWeight: 450,
        vouchers: 2,
        failed: 1,
        totalValue: 70000,
      },
    ],
  },
];

// Esta función se utiliza para enviar notificaciones a todos los clientes suscritos
function sendNotificationToClients(data) {
  clients.forEach((client) => {
    // Comprueba si el cliente está aún conectado
    if (!client.response.finished) {
      // Envía la notificación a través del objeto 'response'
      client.response.write(`data: ${data}\n\n`);
    }
  });
}

function halfOfTimesIsTrue() {
  return Math.random() < 0.5;
}

function generateRandomNumber() {
  const min = 1000000000; // Mínimo número de 10 dígitos (10^9)
  const max = 9999999999; // Máximo número de 10 dígitos (10^10 - 1)
  const numeroAleatorio = Math.floor(Math.random() * (max - min + 1)) + min;
  return numeroAleatorio.toString(); // Convierte el número a una cadena de texto
}

// Configura el middleware CORS
app.use(cors());
app.use(express.json());

app.get("/order/:id", (req, res) => {
  try {
    console.log("order-request ==>", { params: req?.params });
    const id = req.params?.id;
    const orderFind = orders.find((order) => order.orderNumber == id);
    console.log("order-request ==>", { orderFind, orders });
    res.status(200).send(orderFind);
  } catch (error) {
    console.log("order-request ==>", error);
    res.status(500).send("Something went wrong");
  }
});

app.post("/order", (req, res) => {
  res.set({
    Connection: "keep-alive",
    // enabling CORS
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers":
      "Origin, X-Requested-With, Content-Type, Accept",
  });
  const orderNumber = generateRandomNumber();
  const transactionNumber = generateRandomNumber();
  const id = orders.length + 1;
  try {
    console.log("order-request ==>", { data: req.data, body: req.body });
    setTimeout(() => {
      if (halfOfTimesIsTrue()) {
        orders.push({
          ...req.body,
          id: id,
          orderNumber: orderNumber,
          transactionNumber: transactionNumber,
        });
        notifications.push({
          id: notifications.length + 1,
          title: `mensaje nuevo ${notifications.length + 1}`,
          description: "si nuevo e dicho",
          orderNumber: orderNumber,
          transactionNumber: transactionNumber,
          methodPayment: req.body?.methodPayment,
          deliveryType: req.body?.deliveryType,
          date: new Date(),
          status: "unread",
          type: "order-new",
        });
        res.status(201).send({
          id: id,
          orderNumber: orderNumber,
          transactionNumber: transactionNumber,
          methodPayment: req.body?.methodPayment,
          deliveryType: req.body?.deliveryType,
        });
      } else {
        notifications.push({
          id: notifications.length + 1,
          title: `mensaje nuevo ${notifications.length + 1}`,
          description: "si nuevo e dicho",
          orderNumber: orderNumber,
          transactionNumber: transactionNumber,
          methodPayment: req.body?.methodPayment,
          deliveryType: req.body?.deliveryType,
          date: new Date(),
          status: "unread",
          type: "order-failed",
        });
        res.status(400).send({
          message: "No fue posible crear la orden por problemas en al data.",
          id: id,
          orderNumber: orderNumber,
          transactionNumber: transactionNumber,
          methodPayment: req.body?.methodPayment,
          deliveryType: req.body?.deliveryType,
        });
      }
    }, 5000);
  } catch (error) {
    console.log("order-request ==>", error);
    notifications.push({
      id: notifications.length + 1,
      title: `mensaje nuevo ${notifications.length + 1}`,
      description: "si nuevo e dicho",
      orderNumber: orderNumber,
      transactionNumber: transactionNumber,
      methodPayment: req.body?.methodPayment,
      deliveryType: req.body?.deliveryType,
      date: new Date(),
      status: "unread",
      type: "order-failed",
    });
    sendNotificationToClients(`${JSON.stringify(notifications)}\n\n`); // Debes implementar esta función1

    res.status(500).send({
      id: id,
      orderNumber: orderNumber,
      transactionNumber: transactionNumber,
      methodPayment: req.body?.methodPayment,
      deliveryType: req.body?.deliveryType,
    });
  }
});

// event source
app.get("/notification", (req, res) => {
  res.set({
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
    Connection: "keep-alive",

    // enabling CORS
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers":
      "Origin, X-Requested-With, Content-Type, Accept",
  });

  clients.push({ response: res });

  // Maneja la desconexión del cliente
  res.on("close", () => {
    clients.splice(clients.indexOf(res), 1);
  });

  const notificationNotRead = notifications.filter(
    (notification) => notification.status === "unread"
  );
  res.write(`data: ${JSON.stringify(notificationNotRead)}\n\n`);
});

app.get("/notification-list", (req, res) => {
  try {
    const notificationNotRead = notifications.filter(
      (notification) => notification.status === "unread"
    );
    if (notificationNotRead && notificationNotRead.length > 0) {
      res.status(200).send(notificationNotRead);
    } else {
      res.status(200).send([]);
    }
  } catch (err) {
    console.log("notification-list-request ==>", err);
    res.status(500).send({ message: err.message });
  }
});

app.put("/notification/:id", (req, res) => {
  try {
    const id = req.params?.id;
    const notificationFind = notifications.find((notification) => {
      if (notification.orderNumber == id) {
        notification.status = "read";
        return true;
      } else {
        return false;
      }
    });
    if (notificationFind) {
      notificationFind.status = "read";
      res.status(200).send(notificationFind);
    } else {
      res.status(404).send("Not found");
    }
  } catch (err) {
    console.log("notification-request ==>", err);
  }
});

app.get("/order-list/:id", (req, res) => {
  try {
    const id = req.params?.id;
    const orderFind = orderList.find((order) => order.id == id);
    console.log("order-list-request ==>", { id, orderFind });
    if (orderFind) {
      res.status(200).send(orderFind);
    } else {
      res.status(404).send({ message: "No hay ordenes" });
    }
  } catch (err) {
    console.log("order-list-request ==>", err);
    res.status(500).send({ message: err.message });
  }
});

app.get("/order-list", (req, res) => {
  try {
    console.log("order-list-request ==>", {
      data: req.data,
      body: req.body,
      query: req.query,
    });
    res.status(200).send([
      {
        id: 1,
        nOrder: "102122341",
        payStatus: "Pendiente de liberación",
        orderStatus: "Pendiente de despacho",
        dateOfEnrrollment: "12/11/2023",
      },
      {
        id: 2,
        nOrder: "102122342",
        payStatus: "Pendiente de pago",
        orderStatus: "Facturado",
        dateOfEnrrollment: "12/11/2023",
      },
      {
        id: 3,
        nOrder: "102122343",
        payStatus: "Liberado",
        orderStatus: "En Ruta",
        dateOfEnrrollment: "12/11/2023",
      },
      {
        id: 4,
        nOrder: "102122344",
        payStatus: "Pagado",
        orderStatus: "Completado",
        dateOfEnrrollment: "12/11/2023",
      },
      {
        id: 5,
        nOrder: "102122345",
        payStatus: "Pendiente de liberación",
        orderStatus: "Pendiente de despacho",
        dateOfEnrrollment: "12/11/2023",
      },
      {
        id: 6,
        nOrder: "102122346",
        payStatus: "Pendiente de pago",
        orderStatus: "Facturado",
        dateOfEnrrollment: "11/11/2023",
      },
      {
        id: 7,
        nOrder: "102122347",
        payStatus: "Liberado",
        orderStatus: "En Ruta",
        dateOfEnrrollment: "11/11/2023",
      },
      {
        id: 8,
        nOrder: "102122348",
        payStatus: "Pagado",
        orderStatus: "Completado",
        dateOfEnrrollment: "11/11/2023",
      },

      {
        id: 9,
        nOrder: "102122349",
        payStatus: "Pendiente de liberación",
        orderStatus: "Pendiente de despacho",
        dateOfEnrrollment: "11/11/2023",
      },
      {
        id: 10,
        nOrder: "102122350",
        payStatus: "Pendiente de pago",
        orderStatus: "Facturado",
        dateOfEnrrollment: "10/11/2023",
      },
      {
        id: 11,
        nOrder: "102122351",
        payStatus: "Liberado",
        orderStatus: "En Ruta",
        dateOfEnrrollment: "10/11/2023",
      },
      {
        id: 12,
        nOrder: "102122352",
        payStatus: "Pagado",
        orderStatus: "Completado",
        dateOfEnrrollment: "10/11/2023",
      },

      {
        id: 13,
        nOrder: "102122353",
        payStatus: "Pendiente de liberación",
        orderStatus: "Pendiente de despacho",
        dateOfEnrrollment: "10/11/2023",
      },
      {
        id: 14,
        nOrder: "102122354",
        payStatus: "Pendiente de pago",
        orderStatus: "Facturado",
        dateOfEnrrollment: "10/11/2023",
      },
      {
        id: 15,
        nOrder: "102122355",
        payStatus: "Liberado",
        orderStatus: "En Ruta",
        dateOfEnrrollment: "10/11/2023",
      },
      {
        id: 16,
        nOrder: "102122356",
        payStatus: "Pagado",
        orderStatus: "Completado",
        dateOfEnrrollment: "10/11/2023",
      },
      {
        id: 17,
        nOrder: "102122357",
        payStatus: "Pendiente de liberación",
        orderStatus: "Pendiente de despacho",
        dateOfEnrrollment: "10/11/2023",
      },
      {
        id: 18,
        nOrder: "102122358",
        payStatus: "Pendiente de pago",
        orderStatus: "Facturado",
        dateOfEnrrollment: "10/11/2023",
      },
    ]);
  } catch (err) {
    console.log("order-list-request ==>", err);
    res.status(500).send({ message: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Example app listening on port http:${HOST}//${PORT}`);
});
