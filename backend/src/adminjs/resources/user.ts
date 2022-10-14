import { ResourceOptions } from "adminjs";

// Properties será para poder alterar os dados dos usuários
export const userResourceOptions: ResourceOptions ={
    navigation: 'Administração',
    properties:{
        birth:{
            type:'date'
        },
        password:{
            type:'password'
        }, 
        role:{
            availableValues:[
                {value:'admin', label:'Administrador'},
                {value:'user', label:'Usuário Padrão'}
            ]
        }
    },
    editProperties: ['firstName', 'lastName', 'phone', 'email', 'birth', 'password', 'role'],
    filterProperties:[ 'firstName', 'lastName', 'phone', 'email', 'birth', 'role', 'createdAt', 'updateAt'],
    listProperties: ['id' ,'firstName',   'email',  'role'],
    showProperties: ['id', 'firstName', 'lastName', 'phone', 'email', 'birth',  'role', 'createdAt', 'updateAt']
}