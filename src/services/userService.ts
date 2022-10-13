import { EpisodeInstance } from './../models/Episode';
import { UserCreationAttributes } from './../models/Users';
import { User } from './../models';
import { Response, Request } from 'express';


function filterLastEpisodesByCourse(episodes: EpisodeInstance[]) {
    //Definimos uma váriavel para receber um número vazio.
    const coursesOnList: number [] = []
    //Verificação do último episódio assistido.
    //Até onde eu entendi, o reduce está sendo utilizado para que possamos reduzir sempre ao último episódio assistido do usuário. Utilizamos duas váriaveis, a lista atual e a de episodio.
    const lastEpisodes = episodes.reduce((currentList, episode) => {
        //Verificação se  o curso está na lista, se não estiver, será acrescentado o episodio atual.
        if(!coursesOnList.includes(episode.courseId)){
            coursesOnList.push(episode.courseId)
            currentList.push(episode)
            return currentList
        }
        //Se não parar no if anterior, isso significa que a váriavel coursesOnList já tem algum curso, será procurado se o curso atual é o mesmo do curso registrado anteriormente.
        const episodeFromSameCourse = currentList.find(ep => ep.courseId === episode.courseId)
        //O if abaixo irá verificar se a ordem dos episodios é maior ou menos, isso significa que se o usuário assistiu e passou seguinte. Ou seja, se for verdadeiro será retornado a lista atual, se não, vai ser filtrado esse novo episódio e registrado para o usuário.

        if(episodeFromSameCourse!.order > episode.order) {
            return currentList
        }
        //Como passou do if anterior, significa que o episodio é recente, logo, vai filtrar os cursos que são distintos.
        const listWithoutEpisodeFromSameCourse = currentList.filter(ep => ep.courseId !== episode.courseId)
        listWithoutEpisodeFromSameCourse.push(episode)

        return listWithoutEpisodeFromSameCourse
    }, [] as EpisodeInstance[])

    return lastEpisodes
}

export const userService = {
    findByEmail: async(email:string)=>{
        //Será procurado abaixo o email e retornar
        const user = User.findOne({
           
            where:{
                email
            }

        })
        return user
    },
    //abaixo temos a criação do usuário
    create: async(attributes: UserCreationAttributes) =>{
        const user = await User.create(attributes)
        return user
    },

    //Obtendo a lista de continuar do usuário
    getKeepWatchingList: async(id:number) => {
        const userWithWatchingEpisodes = await User.findByPk(id, {
            //Estou procurando pela chave primaria do id. Incluindo a associação com a tabela de episodios e dentro da tabela incluindo támbem a de usuários. O comando through estou falando que vai passar pela tabela do watchTime. É usado a função que foi definida acima, que tem como objetivo pegar qual foi o último episódio assistido.
            include:{
                association: 'Episodes',
                attributes:[
                    'id',
                    'name',
                    'synopsis',
                    'order',
                    ['video_url', 'videoUrl'],
                    ['seconds_long', 'secondsLong'],
                    ['course_id', 'courseId']
                ],

                include:[{
                    association:'course',
                    attributes:[
                        'id',
                        'name',
                        'synopsis',
                        ['thumbnail_url', 'thumbnailUrl']
                    ], 
                    as: 'course'
                }],
                through:{
                    as:'watchtime',
                    attributes:[
                        'seconds',
                        ['updated_at', 'updatedAt']
                    ]
                }
            }
        })
        //Caso retorne vazio, significa que deu erro e retornamos que o usuário não foi encontrado.
        if(!userWithWatchingEpisodes) throw new Error('Usuário não encontrado.')

        const keepWatchingList = filterLastEpisodesByCourse(userWithWatchingEpisodes.Episodes!)
        // @ts-ignore
        //Para sempre dar update nas aulas
        keepWatchingList.sort((a,b) => a.watchtime?.updateAt < b.watchtime?.updateAt ? 1:-1)

        return keepWatchingList
    }
}
