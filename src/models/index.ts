
import { Category} from "./Category";

import { Course } from "./Course"

import {Episode} from './Episode'

import { User } from './Users';


//Criando uma associação com várias tabelas, utilizamos os comandos hasMany para dizer que está saindo algum elemento de uma e indo para outra. E, o comando belongsTo, para refereciar o recebimento dessa coluna.

Category.hasMany(Course, {as:'courses'})

Course.belongsTo(Category)

//---//
Course.hasMany(Episode)

Episode.belongsTo(Course)

//

export {
    Category, Course, Episode, User
}