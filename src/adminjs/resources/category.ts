
import {ResourceOptions} from 'adminjs'


// Vai ser as opções que o meu AdminJs recebe para mexer, a navegação, as propriedades que podem ser alterada, as propriedades que podem ser filtradas, a listagem das propriedades e as propriedades que serão mostradas, caso queira que todas apareçam, não precisa colocar.

export const categoryResourceOptions: ResourceOptions ={
    navigation: 'Catálogo',
    editProperties: ['name', 'position'],
    filterProperties: ['name', 'position', 'createdAt', 'updateAt'],
    listProperties: ['id', 'name', 'position'],
    showProperties: ['id', 'name', 'position', 'createdAt', 'updateAt']
}