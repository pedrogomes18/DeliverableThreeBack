import { Router } from 'express';

import PiusController from '../controller/PiusController';

const piusRoutes = Router();

const piusController = new PiusController();

piusRoutes.post('/create', piusController.create);

export default piusRoutes;
