import { coursesController } from './controllers/coursesController';
import { categoriesController } from './controllers/categoriesController';
import express  from 'express';


const router = express.Router()
//Definindo as rotas que iremos utilizar 
//Rotas da categoria
router.get('/categories', categoriesController.index)
router.get('/categories/:id', categoriesController.show)
//Rotas dos cursos, devemos tomar cuidado de colocar os :id embaixo, para não serem confundidos na solicitaçõo
router.get('/courses/featured', coursesController.featured)
router.get('/courses/newest', coursesController.newest)
router.get('/courses/:id', coursesController.show)


export {router}