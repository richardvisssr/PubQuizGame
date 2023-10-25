const express = require('express');
const { createServer } = require('http');
const { Server: WebSocketServer } = require('ws');

const http = createServer();
const wss = new WebSocketServer({ server: http });
const app = express();
const port = 3000;

app.use(express.static('public'));

let nextClientId = 1; // Initialize a client identifier counter

wss.broadcast = (data) => {
  wss.clients.forEach((client) => {
    // Include the identifier in the JSON message
    client.sendJSON({ id: client.clientId, message: data.message });
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
    if (data !== null) {
      switch(message.type){
        case 'pincode':
          console.log(`Received pincode from Client ${ws.clientId} => ${message.message}`);
          ws.sendJSON({ message: `${message.message}`});
          break;
        case 'name':
          ws.name = message.name;
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
