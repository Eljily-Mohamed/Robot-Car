const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');
const { SerialPort } = require('serialport');
const { ReadlineParser } = require('@serialport/parser-readline');
const cors = require('cors');

const app = express();
const server = createServer(app);
const io = new Server(server);
app.use(cors());
app.use(express.json()); // Middleware to parse JSON bodies

// Use the API router
// app.use('/api', apiRouter);

// Create a serial port instance
const port = new SerialPort({ path: '/dev/ttyUSB0', baudRate: 115200 });
// Create a parser for the serial port
const parser = port.pipe(new ReadlineParser({ delimiter: '\r\n' }));

// Socket.IO connection handling
io.on('connection', (socket) => {
  console.log('Client connected');

  // Listen for data from the serial port
  parser.on('data', (data) => {
    console.log('Data from serial port:', data);
    // Emit the data to the connected clients
    socket.emit('serialData', data);
  });

  // Listen for messages from clients
  socket.on('message', (data) => {
    console.log('Message from client:', data);
    // Write data to the serial port
    port.write(data);
  });

  // Listen for disconnection
  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

// Start the HTTP server
const PORT = 5000;
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
