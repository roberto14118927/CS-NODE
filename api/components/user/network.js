const express = require('express');
const response = require('../../../network/response');
const { getConnection } = require('../../../model/db')


const router = express.Router();

router.post('/register', async function (req, res) {
    // Realizar conexión a DB
    const client = await getConnection();

    let username = req.query.username;
    let email = req.query.email;
    let password = req.query.password;
    let phone_number = req.query.phone_number;

    const query_request = {
        text: 'INSERT INTO tbl_usersdb(username, email, password, phone_number) VALUES($1, $2, $3, $4)',
        values: [username, email, password, phone_number]
    };

    client.query(query_request)
        .then(r => { response.success(req, res, r, 200); })
        .catch(e => { response.success(req, res, e.detail, 200); });

});

router.get('/all_users', async function (req, res) {
    const client = await getConnection();

    const querys = {
        text: 'SELECT * FROM usersdb',
    };


    client.query(querys)
        .then(r => { response.success(req, res, r.rows, 200); })
        .catch(e => { return e.stack });
});

module.exports = router;

