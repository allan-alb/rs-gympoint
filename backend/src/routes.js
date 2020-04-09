import { Router } from 'express';

import authMiddleware from './app/middlewares/auth';
import SessionController from './app/controllers/SessionController';
import StudentController from './app/controllers/StudentController';

const routes = Router();

routes.get('/', (req, res) => res.json({ message: 'hello, mate' }));
routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);
routes.post('/students', StudentController.store);
routes.post('/students/:id', StudentController.update);

export default routes;
