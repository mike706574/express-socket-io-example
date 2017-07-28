import pgp from 'pg-promise';

const config = {host: 'localhost',
                port: '5432',
                database: 'postgres',
                user: 'postgres',
                password: 'postgres'};

const db = pgp()(config);

export default db;
