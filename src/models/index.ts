
import { Category} from "./Category";

import { Course } from "./Course"

import {Episode} from './Episode'

import { User } from './Users';

import {Favorite} from './Favorite'


//Criando uma associação com várias tabelas, utilizamos os comandos belongsTo para dizer que está saindo algum elemento de uma e indo para outra. E, o comando hasMany, para refereciar o recebimento dessa coluna.

Category.hasMany(Course, {as:'courses'})

Course.belongsTo(Category)

//---//
Course.hasMany(Episode, {as:'episodes'})

Episode.belongsTo(Course)

//--Estamos abaixo indicando para o prograna, que temos várias informações de muito para muitos do curso para o usuario passando pelos favoritos, e vice versa.

Course.belongsToMany(User, {through: Favorite})

User.belongsToMany(Course, {through: Favorite})

// --- //

Course.hasMany(Favorite, {as: 'FavoritesUsers', foreignKey: 'course_id'})
User.hasMany(Favorite, {as: 'FavoritesCourses', foreignKey: 'user_id'})

Favorite.belongsTo(Course)
Favorite.belongsTo(User)

User.belongsToMany(Course, {through: Favorite})


export {
    Category, Course, Episode, User, Favorite
}