
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { getUser } from '../models/user.model.js'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const data = dotenv.config({
    path: path.resolve(__dirname, `../environments/.env.${process.env.NODE_ENV}`)
})

const user_create = (req, res) => {
    getUser.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        phone_number: req.body.phone_number,
        last_name: req.body.last_name

    }, { fields: ['name', 'email', 'password'] })
        .then(users => {
            res.send(users)
        })
        .catch(err => {
            res.status(400).send(err)
        });
};

const user_login = (req, res) => {
    const user = getUser.findOne({ where: { email: req.query.email } });
    if (!user) return res.status(400).json({ error: 'Usuario no encontrado' });

    const validPassword = bcryptjs.compare(req.query.password, user.password);
    if (!validPassword) return res.status(400).json({ error: 'contraseña no válida' })

    const token = jwt.sign({
        sub: user.name,
        id: user.id,
    }, 'secret', { expiresIn: '30m' }, data.parsed.JWT_TOKEN_SECRET, { algorithm: 'HS256' })

    user.token = token;

    res.header('auth-token', token).json({
        error: null,
        data: { token }
    });
};

export const userController = { user_create, user_login };