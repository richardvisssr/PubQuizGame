const express = require('express');
const { createServer } = require('http');
const { Server: WebSocketServer } = require('ws');
const bodyParser = require('body-parser');
const quizMasterActions = require("./routes/quizMasterActions");

const http = createServer();
const wss = new WebSocketServer({ server: http });
const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(bodyParser.json());
app.use("/", quizMasterActions);

let nextClientId = 1; // Initialize a client identifier counter

wss.broadcast = function (data, sender) {
  wss.clients.forEach(function (client) {
    if (client !== sender) {
      client.send(JSON.stringify(data)); // Send the data as a JSON string
    }
  });
};


wss.on('connection', (ws) => {
  ws.clientId = nextClientId; // Assign a unique identifier to the client
  nextClientId++;

  ws.sendJSON = (data) => {
    ws.send(JSON.stringify(data));
  };

  ws.sendJSON({ message: 'Hello from server!', id: ws.clientId });

  ws.on('message', (data) => {
    const message = JSON.parse(data);
    if (message !== null) { // Check the message, not the data
      switch (message.type) {
        case 'pincode':
          console.log(`Received pincode from Client ${ws.clientId} => ${message.message}`);
          const message = { type: "validCode", message: `${message.message}` };
          wss.broadcast(message, ws);
          break;
        case 'answer':
          const newMessage = { type: 'answer-ack', message: `${message.message}` };
          wss.broadcast(newMessage, ws);
          break;
        default:
          break;
      }
    } else {
      console.log(`Null message received from Client ${ws.clientId}`);
    }
  });

  ws.on('close', () => {
    console.log(`Client ${ws.clientId} disconnected`);
  });
});


http.on('request', app);
http.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});
