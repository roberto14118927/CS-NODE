import Sequelize from 'sequelize';
import { db } from './config.js';

const sequelizeClient = (() => {
    switch (process.env.NODE_ENV) {
        case 'development':
            return new Sequelize(db.database, db.user, db.password, {
                host: db.host,
                port: db.portdb,
                dialect: 'postgres',
            });

        case 'test':
            return new Sequelize(db.database, db.user, db.password, {
                port: db.portdb,
                host: db.host,
                dialect: 'postgres',
                dialectOptions: {
                    ssl: {
                        require: true,
                        rejectUnauthorized: false
                    }
                },
            });

        default:
            return new Sequelize(db.database, db.user, db.password, {
                port: db.portdb,
                host: db.host,
                dialect: 'postgres',
                dialectOptions: {
                    ssl: {
                        require: true,
                        rejectUnauthorized: false
                    }
                },
            });
    }
})();



sequelizeClient.sync({ force: true })
    .then(() => {
        console.log('Conectado')
    })
    .catch((err) => {
        console.log('No se conecto', err)
    });

export const getData = { sequelizeClient };
