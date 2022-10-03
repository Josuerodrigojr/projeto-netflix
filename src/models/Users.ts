import { sequelize } from './../index';
import { Model, Optional, DataTypes } from "sequelize"
import bcrypt from 'bcrypt'

//Aqui eu defino o que a tabela deve ter nas colunas
//Adicionando no metodo role, que o usuario só pode ser administrador ou usuário
export interface User{
    id:number
    firstName: string
    lastName: string
    phone: string
    birth: Date
    email: string
    password: string
    role: 'admin' | 'user'
}

//Criando uma hierarquia que está puxando o Optional do sequelize e o id da classe User
export interface UserCreationAttributes extends Optional <User, 'id'>{ }

//Criando uma classe que irá pegar as configurações de Model, User e UserCreationAttributes
export interface UserInstance extends Model <User, UserCreationAttributes>, User { }


//O define vai criar o método dentro da minha aplicação, definindo o tipo de cada coluna.
export const User = sequelize.define<UserInstance, User>('users', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    firstName:{
      allowNull: false,
      type: DataTypes.STRING
    },
    lastName: {
      allowNull: false,
      type: DataTypes.STRING
    },
    phone: {
      allowNull: false,
      type: DataTypes.STRING
    },
    birth: {
      allowNull: false,
      type: DataTypes.DATE
    },
    email: {
      allowNull: false,
      unique: true,
      type: DataTypes.STRING,
      //Validate, vai verificar se o padrão que será digitado será um e-mail.
      validate: {
        isEmail: true
      }
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING
    },
    role: {
      allowNull: false,
      type: DataTypes.STRING, 
      validate:{
        isIn: [['admin', 'user']]
      }
    }
      },  {
        hooks: {
          beforeSave: async (user) => {
            if (user.isNewRecord || user.changed('password')) {
              user.password = await bcrypt.hash(user.password.toString(), 10);
            }
          }
        }})