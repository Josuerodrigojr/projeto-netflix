import { Op } from 'sequelize'
import { getPaginationParams } from '../helpers/getPaginationParams'
import {Course} from '../models'

export const courseService ={
    findByIdWithEpisodes: async (id: string) => {
    const courseWithEpisodes = await Course.findByPk(id,{
        attributes: ['id', 'name', 'synopsis', ['thumbnail_url', 'thumbnailUrl']], 
        include:{
            // Posso colocar o nome que dei no index do model
            association: 'episodes',
            attributes: [
              'id',
              'name',
              'synopsis',
              'order',
              ['video_url', 'videoUrl'],
              ['seconds_long', 'secondsLong']
            ],
            //Colocar a ordenação como true
            order: [['order', 'ASC']],
            separate: true
          }
        })
    
        return courseWithEpisodes
      },
      getRandomFeaturedCourses: async ()=>{
        const featuredCourses = await Course.findAll({
            attributes: ['id', 'name', 'synopsis', ['thumbnail_url', 'thumbnailUrl']],
            where:{
                featured:true
            }

        })
        //Ordenando para que a lista de cursos fique em uma posição aleatória tofas as vezes
        const randomFeaturedCourses = featuredCourses.sort(()=> 0.5 - Math.random())
        //Retornando somente 3 elementos do curso
        return randomFeaturedCourses.slice(0, 3)
      }, 
      getTopTenNewest: async()=>{
        const courses = await Course.findAll({
            //Limitando a 10
            limit:10,
            //Pegamos para ser ordenado pela criação de um curso na plataforma do AdminJs
            order: [['created_at', 'DESC']]
        })
        return courses
      },
       findByname: async (name: string, page:number, perPage:number) =>{
       
        const offset = (page -1)*perPage

        const {count, rows} = await Course.findAndCountAll({
          attributes:[
            'id',
            'name',
            'synopsis',
            ['thumbnail_url', 'thumbnailUrl']
          ],
          where:{
            //O op.iLike, irá ajudar na pesquisa no nosso operador, o ilike irá servir para que o usuário não precise se preocupar em maiuscula ou minuscula.
            name: {
              [Op.iLike]: `%${name}%`
            }
          }, 
          limit: perPage,
          offset
        })
        
        return {courses:rows,
          page,
          perPage,
          total: count
        }
       } 
}