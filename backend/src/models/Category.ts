import { sequelize } from './../index';
import { Model, Optional, DataTypes } from "sequelize"

//Aqui eu defino o que a tabela deve ter nas colunas
export interface Category{
    id:number
    name: string
    position:number

}

//Criando uma hierarquia que está puxando o Optional do sequelize e o id da classe category
export interface CategoryCreationAttributes extends Optional <Category, 'id'>{ }

//Criando uma classe que irá pegar as configurações de Model, Category e CategoryCreationAttributes
export interface CategoryInstance extends Model <Category, CategoryCreationAttributes>, Category { }


//O define vai criar o método dentro da minha aplicação, definindo o tipo de cada coluna.
export const Category = sequelize.define<CategoryInstance, Category>('categories',{
            id:{
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: DataTypes.INTEGER
        },
        name:{
          allowNull:false,
          type: DataTypes.STRING
        },
        position:{
          allowNull:false,
          unique: true,
          type: DataTypes.INTEGER
        }

})