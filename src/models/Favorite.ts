import { UserInstance } from './Users';
import { CourseInstance } from './Course';
import { DataTypes } from 'sequelize';
import { sequelize } from './../index';
import { Model } from 'sequelize';
import { Optional } from 'sequelize';


export interface Favorite{
    userId:number
    courseId: number

}


//Nesse caso, não precisamos criar, já que não estamos criando nenhuma tabela, mas sim, referenciando dados de outra tabela. Mas precisamos incluir as instancias já estabelecidas, como colocamos abaixo

//Criando uma classe que irá pegar as configurações de Model, Category e CategoryCreationAttributes
export interface FavoriteInstance extends Model <Favorite>, Favorite {
    course?: CourseInstance
    user?: UserInstance
 }


//O define vai criar o método dentro da minha aplicação, definindo o tipo de cada coluna.

export const Favorite = sequelize.define<FavoriteInstance, Favorite>('Favorite', {
    userId: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.INTEGER,
        references: { model: 'users', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      courseId: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.INTEGER,
        references: { model: 'courses', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      }
})
