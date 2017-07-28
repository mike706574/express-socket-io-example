import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import logger from 'morgan';
import path from 'path';
import { log } from 'winston';

import routes from './routes';
import { error } from './util';

export default function configureSocketIO(io) {
    io.on('connection', function (socket) {
        socket.emit('news', { hello: 'world' });
        socket.on('my other event', function (data) {
            console.log(data);
        });
    });

    return io;
}
