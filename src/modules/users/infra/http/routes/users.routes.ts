import { Router } from 'express';

import UsersController from '../controller/UsersController';

const usersRoutes = Router();

const usersController = new UsersController();

usersRoutes.post('/register', usersController.create);
usersRoutes.get('/getAll', usersController.getAll);
usersRoutes.get('/getUser/:idUser', usersController.getUserById);

export default usersRoutes;
