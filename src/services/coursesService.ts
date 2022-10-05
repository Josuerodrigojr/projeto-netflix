import {Course} from '../models'

export const courseService ={
    findByIdWithEpisodes: async (id: string) => {
    const courseWithEpisodes = await Course.findByPk(id,{
        attributes: ['id', 'name', 'synopsis', ['thumbnail_url', 'thumbnailUrl']], 
        include:{
            // Posso colocar o nome que dei no index do model
            association: 'episodies',
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
}