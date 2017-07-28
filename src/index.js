import configureExpress from './app';
import configureSocketIO from './io';
import express from 'express';
import http from 'http';
import socketIO from 'socket.io';

const app = express();
const server = http.Server(app);
const io = socketIO(server);

configureExpress(app, io);
configureSocketIO(io);

const port = 8080;

server.listen(port, () => console.log(`Listening on port ${port}.`));
