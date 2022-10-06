import { episodeService } from './../services/episodeService';
import {Request, Response} from 'express'



export const episodesController ={
    //GET //episodes/stream?videoUrl
    stream: async (req:Request, res:Response) =>{
        const {videoUrl} = req.query
        try{
            if (typeof videoUrl!== 'string') throw new Error ('O videoUrl não é uma string')
             //O comando abaixo irá servir para que mande o video por completo, ir carregando de acordo com a internet do usuário 
          const range = req.headers.range
          
          episodeService.streamEpisodeToResponse(res, videoUrl, range)

          

        } catch(err){
            if (err instanceof Error) {
                return res.status(400).json({ message: err.message })
              }
        }
    }
}