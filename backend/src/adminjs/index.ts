import { authtenticationOptions } from './authetication';
import { brandingOptions } from './branding';
import { dashboardOptions } from './dashboard';
import { locale } from './locale';
import { adminJsResources } from './resources/index';


//Importando os pacotes, estamos importando o AdminJs para as rotas e as páginas de administrador da minha aplicação.



import AdminJS from 'adminjs';
// Controlar as rotas com o express
import AdminJSExpress from '@adminjs/express';
//Acesso ao banco de dados com o backend
import AdminJSSequelize from '@adminjs/sequelize';
import { sequelize } from './../index';


//O sequelize para edição do banco de dados.


//Vai registrar o adaptador do banco de dados que estamos utilizando
AdminJS.registerAdapter(AdminJSSequelize)

export const adminJS = new AdminJS({
    //Databases vai ser para colocar quais são os banco de dados que vamos utilizar.
    databases:[sequelize],
    // A rota que teremos acesso no POSTMAN para saber que vamos acessar o administrador
    rootPath: '/admin',
    resources: adminJsResources,
    //Customização das cores no adminJS.
    branding: brandingOptions, 
      //locale é o arquivo ts na mesma pasta e é responsável pela tradução do AdminJs.
      locale:locale,
      // O dashboar será responsável pela alteração da página inicial do Admin JS, dentro dela temos o metodo component, que vamos estilizar a página da home do AdminJS. O handler será chamado quando a tela for iniciada, nesse caso, estamos fazendo a contagem de cada método. Os elementos do handler estará disponiveis no Dashboard.ts
      dashboard: dashboardOptions


})

export const adminJsRouter = AdminJSExpress.buildAuthenticatedRouter(
  adminJS,
  authtenticationOptions,
  null,
  { 
    resave: false, 
    saveUninitialized: false 
  }
)


