import { Router } from 'express';
import userRoutes from './user.routes.js'
const router = Router();

router.get('/healthcheck', (req, res) => res.sendStatus(200));

router.use(userRoutes);

export default router;