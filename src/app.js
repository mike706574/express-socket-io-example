import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import logger from 'morgan';
import path from 'path';
import { log } from 'winston';

import routes from './routes';
import { error } from './util';

export default function configureExpress(app, io) {
    app.disable('x-powered-by');

    // View engine setup
    app.set('views', path.join(__dirname, '../views'));
    app.set('view engine', 'pug');

    app.use(logger('dev', {
        //  skip: () => app.get('env') === 'test'
    }));

    app.use(bodyParser.json());
    app.use(express.static(path.join(__dirname, '../public')));
    app.use(cors());

    // Routes
    app.use('/', routes);

    app.use((req, res) => {
        error(res, 404, 'Resource not found.');
    });

    // Error handler
    app.use((err, req, res) => {
        error(res, error.status || 500, err.message);
    });

    return app;
}
