import { Router } from "express";
import { home } from '../controllers/controller.main.js';

const homeRouter = Router();

homeRouter.get('/',home);


export default homeRouter;
