import jwt from 'jsonwebtoken'
import { dataEnv } from '../config/env.config.js'


const verifyToken = (req, res, next) => {
    const token = req.header('Bearer')

    if (!token) return res.status(401).json({ error: 'Acceso denegado' })
    try {
        const verified = jwt.verify(token, dataEnv.parsed.JWT_TOKEN_SECRET)
        req.user = verified
        next();
    } catch (error) {
        res.status(400).send({ error: 'token no es válido' })
    }
}



const allowlist = ['http://localhost:3000', '']
const corsOptionsDelegate = function (req, callback) {
    let corsOptions;
    if (allowlist.indexOf(req.header('Origin')) !== -1) {
        corsOptions = { origin: true }
    } else {
        corsOptions = { origin: false }
    }
    callback(null, corsOptions)
}


export const middleware = { verifyToken, corsOptionsDelegate };