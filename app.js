import { api } from './config/config.js';
import swaggerDocs from './config/swagger.js';
import middleware from './middlewares/validateToken.js'

import express from 'express';

import user from './routes/user.routes.js';


const app = express();

// ROUTERS
app.use('/api/user', user);
// app.use('/api/profile', middleware, profile);



// SERVIDOR ACTIVO
app.listen(api.port, () => {
    console.log(`Servidor corriento en el puerto => ${api.port}`);
    swaggerDocs(app, api.port);
});

