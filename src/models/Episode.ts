import { DataTypes } from 'sequelize';
import { sequelize } from './../index';
import { Model } from 'sequelize';
import { Optional } from 'sequelize';


export interface Episode{
    id:number
    name: string
    synopsis: string
    order: number
    videoUrl: number
    secondsLong: number
    courseId: number
}


//Criando uma hierarquia que está puxando o Optional do sequelize e o id da classe category. Estou informando na linha abaixo que para criar um curso, não vou precisar das informações abaixo.
export interface EpisodeCreationAttributes extends Optional <Episode, 'id' | 'videoUrl' | 'secondsLong'>{ }

//Criando uma classe que irá pegar as configurações de Model, Category e CategoryCreationAttributes
export interface EpisodeInstance extends Model <Episode, EpisodeCreationAttributes>, Episode { }


//O define vai criar o método dentro da minha aplicação, definindo o tipo de cada coluna.

export const Episode = sequelize.define<EpisodeInstance, Episode>('Episode', {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING
      },
      synopsis: {
        allowNull: false,
        type: DataTypes.TEXT
      },
      order: {
        allowNull: false,
        type: DataTypes.STRING
      },
      videoUrl: {
        type: DataTypes.STRING
      },
      secondsLong: {
        type: DataTypes.INTEGER
      },
      courseId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: { model: 'courses', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
      }
})