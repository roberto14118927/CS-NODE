const { Pool } = require('pg')
const config = require('../config.js');

// const { Sequelize } = require('sequelize')

async function getConnection() {
    const client = new Pool({
        user: config.db.user,
        host: config.db.host,
        database: config.db.database,
        password: config.db.password,
        port: config.db.port,
    });
    await client.connect();
    return client;
}

// const sequelize = new Sequelize('CSDB', 'postgres', 'root', {
//     host: 'localhost',
//     dialect: 'postgres'
// });

// sequelize.authenticate()
//     .then(() => {
//         console.log('Conectado')
//         const Note = sequelize.define('notes',
//             {
//                 note: Sequelize.TEXT, tag: Sequelize.STRING
//             }
//         );
//     })
//     .catch(err => {
//         console.log('No se conecto')
//     })



module.exports = { getConnection };
