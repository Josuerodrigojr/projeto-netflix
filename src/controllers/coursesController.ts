import { favoriteService } from './../services/favoriteService';
import { likeService } from './../services/likeService';
import { AuthenticatedRequest } from './../middlewares/auth';
import { courseService } from './../services/coursesService';
import {Request, Response} from 'express'
import { getPaginationParams } from '../helpers/getPaginationParams';



export const coursesController ={
    
    //GET /courses/featured
    featured: async(req:Request, res:Response) =>{
        try{
            const featuredCourses = await courseService.getRandomFeaturedCourses()
            return res.json(featuredCourses)
        } catch (err){

        }
    },

    //GET /courses/newest
    newest: async(req:Request, res:Response)=>{
        try{
            const newestCourses = await courseService.getTopTenNewest()
            return res.json(newestCourses)
        } catch(err){
            if (err instanceof Error) {
                return res.status(400).json({ message: err.message })
              }
        }
    },
    
    //GET /courses/:id
    show: async (req:AuthenticatedRequest, res:Response) =>{
        const userId = req.user!.id
        const courseId = req.params.id

        try{
            const course = await courseService.findByIdWithEpisodes(courseId)
            

            if (!course){
                return res.json({message: 'Curso não foi encontrado'})
            }
            const liked = await likeService.isLiked(userId, Number(courseId))
            const favorited = await favoriteService.isFavorited(userId, Number(courseId))
                return res.json({...course.get(), liked, favorited})
            
        } catch (err) {
            if (err instanceof Error) {
              return res.status(400).json({ message: err.message })
            }
          }
    },
    //Get /courses/search?name=

    search: async(req:Request, res:Response) =>{
        // pelo que conheço, o params são os parâmetro da URL do seu endpoint, enquanto o query, são os parâmetro enviados após o interrogação(?). Ou, o query é utilizado após a interrogação.
        
        const {name} = req.query
        const [page, perPage] = getPaginationParams(req.query)
        try{
        if (typeof name!== 'string') throw new Error ('O nome não é uma string')
        const courses= await courseService.findByname(name, page, perPage);
        return res.json(courses)
    } catch (err) {
        if (err instanceof Error) {
          return res.status(400).json({ message: err.message })
        }
      }   
    
    
    }

}