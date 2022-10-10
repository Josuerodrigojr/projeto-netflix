import { likeController } from './controllers/likesController';
import { favoritesController } from './controllers/favoritesController';
import { authController } from './controllers/authController';
import { episodesController } from './controllers/episodesController';
import { coursesController } from './controllers/coursesController';
import { categoriesController } from './controllers/categoriesController';
import express  from 'express';
import { ensureAuth, ensureAuthViaQuery } from './middlewares/auth';


const router = express.Router()


//Rotas do de usuário

// Para que possamos colocar as rotas que precisam de autenticação do nosso programa, devemos colocar o nome da função que foi definida na pasta de middlewares, logo depois do caminho abaixo.

//Rota para o registro de usuários
router.post('/auth/register', authController.register)
//Rota para o login do usuário na plataforma
router.post('/auth/login', authController.login)

//Definindo as rotas que iremos utilizar 
//Rotas da categoria
//Rota para a categoria dos cursos
router.get('/categories', ensureAuth,categoriesController.index)
//Rota para cada tipo de categoria
router.get('/categories/:id', ensureAuth, categoriesController.show)
//Rotas dos cursos, devemos tomar cuidado de colocar os :id embaixo, para não serem confundidos na solicitaçõo
//Rota para os cursos em destaque
router.get('/courses/featured', ensureAuth, coursesController.featured)
//Rota para os cursos mais novos
router.get('/courses/newest', coursesController.newest)
//Rota para procurar o curso
router.get('/courses/search', ensureAuth, coursesController.search)
//Rota para os cursos por id
router.get('/courses/:id', ensureAuth, coursesController.show)
//Rota para os episodios na stream
router.get('/episodes/stream', ensureAuthViaQuery, episodesController.stream)
//Rota para os favoritos
router.get('/favorites', ensureAuth, favoritesController.index)
router.post('/favorites', ensureAuth, favoritesController.save)
router.delete('/favorites/:id', ensureAuth, favoritesController.delete)
//Rota de like
router.post('/likes', ensureAuth, likeController.save)

export {router}