import { Router } from 'express';
import { success } from '../../../network/response.js';
import { getData } from '../../../models/db.js';
import { getUser } from '../../../models/Users.js'


const router = Router();

router.post('/register', async function (req, res) {
    // Realizar conexión a DB
    const client = await getData();

    let username = req.query.username;
    let email = req.query.email;
    let password = req.query.password;
    let phone_number = req.query.phone_number;

    const query_request = {
        text: 'INSERT INTO tbl_usersdb(username, email, password, phone_number) VALUES($1, $2, $3, $4)',
        values: [username, email, password, phone_number]
    };

    client.query(query_request)
        .then(r => { success(req, res, r, 200); })
        .catch(e => { success(req, res, e.detail, 200); });

});

router.get('/all_users', async function (req, res) {
    const client = await getData.getConnection();
    const querys = {
        text: 'SELECT * FROM tbl_usersdb',
    };


    client.query(querys)
        .then(r => { res.send(r.rows) })
        .catch(e => { console.log(e.stack) });
});

router.get('/all_users_orm', async function (req, res) {
getUser.findAll({ attributes: ['name'] })
    .then(users => {
        res.send(users)
    })
    .catch(err => {
        console.log(err)
    })
});

export default router;

