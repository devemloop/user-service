import { Router } from 'express';

import authenticateMiddleware from '@middlewares/authenticate';

import UserController from './controllers/UserController';
import createUserMasterValidator from './validators/CreateUserMasterValidator';
import createUserValidator from './validators/CreateUserValidator';
import userLoginValidator from './validators/UserLoginValidator';

const routes = Router();

routes.post('/master/create', createUserMasterValidator, UserController.create);

routes.post(
  '/create',
  authenticateMiddleware,
  createUserValidator,
  UserController.createWithToken
);

routes.post('/login', userLoginValidator, UserController.login);

routes.get('/me', authenticateMiddleware, UserController.index);

export default routes;
