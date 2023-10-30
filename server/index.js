const express = require('express');
const { createServer } = require('http');
const { Server: WebSocketServer } = require('ws');
const bodyParser = require('body-parser');
const quizMasterActions = require("./routes/quizMasterActions");
const teamActions = require("./routes/teamActions");

const http = createServer();
const wss = new WebSocketServer({ server: http });
const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(bodyParser.json());
app.use("/", quizMasterActions);
app.use("/", teamActions);

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
    const receivedMessage = JSON.parse(data); // Renamed the variable
  
    if (receivedMessage !== null) {
      switch (receivedMessage.type) {
        case 'pincode':
          console.log(`Received pincode from Client ${ws.clientId} => ${receivedMessage.message}`);
          const pinMessage = { type: "validCode", message: `${receivedMessage.message}` };
          wss.broadcast(pinMessage, ws);
          break;
        case 'submitAnswer':
          const newData = {
            teamId: receivedMessage.data.teamId,
            teamName: receivedMessage.data.teamName,
            answer: receivedMessage.data.answer
          }

          const newAnswerMessage = { type: 'answer-ack', message: `${JSON.stringify(newData)}` };
          wss.broadcast(newAnswerMessage, ws);
          break;

        case 'gameStart': 
          const gameStartMessage = { type: 'gameStart', message: `${receivedMessage.message}` };
          wss.broadcast(gameStartMessage, ws);
          break;

        case 'newQuestion':
          const questionMessage = { type: 'newQuestion', message: `${receivedMessage.message}` };
          wss.broadcast(questionMessage, ws);
          break;
        case 'newTeamRegistered':
          const teamName = receivedMessage.data.name;
          const teamId = receivedMessage.data.id;
          const score = receivedMessage.data.score;
  
          const requestData = {
            teamId: teamId,
            name: teamName,
            score: score
          };
  
          fetch("http://localhost:3000/teams", {
            method: "PUT",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(requestData)
          })
            .then(response => {
              if (response.ok) {
                const userAckMessage = { type: 'team-ack', message: `${requestData}` };
                const quizMasterAckMessage = { type: 'newTeam', message: `${JSON.stringify(requestData)}` };

                wss.broadcast(quizMasterAckMessage, ws);
                ws.send(JSON.stringify(userAckMessage));

              } else {
                throw new Error(response.statusText);
              }
            })
            .catch(error => {
              console.log(error);
            });
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
