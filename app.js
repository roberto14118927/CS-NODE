import { createServer } from 'http';
import { Server } from 'socket.io';
import { api } from './config/config.js';
import { middleware } from './middlewares/middleware.js'
import swaggerDocs from './config/swagger.config.js';
import nodemailer from 'nodemailer';
import sgMail  from '@sendgrid/mail';
import { dataEnv } from './config/env.config.js'

import express from 'express';
import cors from 'cors';
import apicache from 'apicache';

import user from './routes/user.routes.js';

const cache = apicache.middleware;

const app = express();

const httpServer = createServer(app);
const io = new Server(httpServer, { cors: { origin: '*' } });



app.use(cors(middleware.corsOptionsDelegate));

app.use(express.json());

// ROUTERS
app.use('/api/user', user);
// app.use('/api/profile', middleware, profile);


io.on('connection', (socket) => {
    console.log('Conexión establecida');

});



// SERVIDOR ACTIVO
app.listen(api.port, () => {
    console.log(`Servidor corriento en el puerto => ${api.port}`);
    swaggerDocs(app, api.port);
});

