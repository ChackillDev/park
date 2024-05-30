import { Router } from "express";
import {listar,agregar, acceder} from '../controllers/controllers.crud.js';

const crudRouter = Router();

//gets

crudRouter.get('/login',(req,res)=>{
  res.render('acceso')
});
crudRouter.get('/add',(_,res)=>{
  res.render('registro')
});
crudRouter.get('/list',listar);

//posts

crudRouter.post('/login',acceder);
crudRouter.post('/add',agregar);



export default crudRouter;
