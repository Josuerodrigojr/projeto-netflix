import { courseService } from './../services/coursesService';
import {Request, Response} from 'express'



export const coursesController ={
    //GET /courses/:id
    show: async (req:Request, res:Response) =>{
        const {id} = req.params

        try{
            const course = await courseService.findByIdWithEpisodes(id)
            return res.json(course)
        } catch (err) {
            if (err instanceof Error) {
              return res.status(400).json({ message: err.message })
            }
          }
    }
}