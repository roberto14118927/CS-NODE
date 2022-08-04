
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { getUser } from '../models/user.model.js'
import sgMail from '@sendgrid/mail';
import { dataEnv } from '../config/env.config.js'
import { v4 as uuidv4 } from 'uuid';


const user_create = (req, res) => {
    getUser.User.create({
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

const user_login = async (req, res) => {

    const user = await getUser.User.findOne({ where: { email: req.body.email } });

    if (user) {
        const validPassword = bcryptjs.compareSync(req.body.password, user.password);
        if (validPassword) {
            const token = jwt.sign({
                sub: user.name,
                id: user.id,
            }, 'secret', { expiresIn: '30m' }, dataEnv.parsed.JWT_TOKEN_SECRET, { algorithm: 'HS256' })

            user.token = token;

            res.header('auth-token', token).json({
                error: null,
                data: {
                    token,
                    user: user.id
                }
            });
        }
        else {
            return res.status(400).json({ error: 'contraseña no válida' });
        }
    }
    else {
        return res.status(400).json({ error: 'Usuario no encontrado' });
    }
};

const recovery_password = (req, res) => {

    // REALIZAR EL PROCESO PARA LA RECUPERACIÓN DEL CONTRASEÑA
    sgMail.setApiKey(dataEnv.parsed.SENDGRID_API_KEY)
    const token = uuidv4();
    const email = req.body.email;
    const msg = {
        to: req.body.email,
        from: 'robert_edu89@hotmail.com',
        subject: "Recuperar contraseña",
        text: "Recuperar contraseña",
        html: `<ul><li><a href=${dataEnv.parsed.HOST_URL_FRONT}/${token}>Website</a></li> </ul>`,
    }

    sgMail
        .send(msg)
        .then((response) => {
            if (response[0].statusCode === 202) {
                getUser.UserRecovery.create({
                    email,
                    token,
                }, { fields: ['email', 'token'] })
                    .then(data => {
                        res.send(data)
                    })
                    .catch(err => {
                        res.status(400).send(err)
                    });
            }
        })
        .catch((error) => {
            console.error(error)
        });

}

export const userController = { user_create, user_login, recovery_password };