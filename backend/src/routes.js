import { Router } from 'express';

import authMiddleware from './app/middlewares/auth';
import SessionController from './app/controllers/SessionController';
import StudentController from './app/controllers/StudentController';
import PlanController from './app/controllers/PlanController';
import EnrollmentController from './app/controllers/EnrollmentController';

const routes = Router();

routes.get('/', (req, res) => res.json({ message: 'hello, mate' }));
routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);
routes.post('/students', StudentController.store);
routes.put('/students/:id', StudentController.update);

routes.get('/plans', PlanController.index);
routes.post('/plans', PlanController.store);
routes.put('/plans/:id', PlanController.update);
routes.delete('/plans/:id', PlanController.delete);

routes.get('/enrollments', EnrollmentController.index);
routes.post('/enrollments', EnrollmentController.store);
routes.put('/enrollments/:id', EnrollmentController.update);
routes.delete('/enrollments/:id', EnrollmentController.delete);

export default routes;
