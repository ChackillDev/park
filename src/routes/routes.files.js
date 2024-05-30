import { Router } from "express";
import {upload} from '../controllers/controller.files.js';

const filesRouter = Router();

filesRouter.post('/add',upload);

export default filesRouter;
