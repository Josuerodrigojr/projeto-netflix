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
    branding:{
        companyName: 'OneBitFlix',
        logo: '../../public/logoOnebitflix.jpg',
        theme: {
          colors: {
            primary100: '#ff0043',
              primary80: '#ff1a57',
              primary60: '#ff3369',
              primary40: '#ff4d7c',
                primary20: '#ff668f',
              grey100: '#151515',
              grey80: '#333333',
              grey60: '#4d4d4d',
              grey40: '#666666',
              grey20: '#dddddd',
              filterBg: '#333333',
              accent: '#151515',
              hoverBg: '#151515',
          }
        }
      }

})

//Controle das rotas no proprio ADMIN, construindo as rotas para o programador.
export const adminJsRouter = AdminJSExpress.buildRouter(adminJS)


