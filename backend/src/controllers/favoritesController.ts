import { AuthenticatedRequest } from './../middlewares/auth';
import { Favorite } from '../models/Favorite';

import { favoriteService } from "../services/favoriteService";
import {Request, Response} from 'express'


export const favoritesController = {
    //Get/Favorites
    index: async(req:AuthenticatedRequest, res:Response)=>{
        const userId = req.user!.id

        try{
            const favorites = await favoriteService.findByUserId(userId)
            return res.status(201).json(favorites)
        } catch(err){
            if (err instanceof Error) {
                return res.status(400).json({ message: err.message })
              }
        }
    },
    
    // POST/favorite
    save: async (req:AuthenticatedRequest, res:Response) =>{
        //Isso significa que estamos chamando e armazenando o usuário direto do meu token autenticado.
        const userId = req.user!.id
        const {courseId} = req.body

        try{
            const favorite = await favoriteService.create(userId, Number(courseId))
            return res.status(201).json(favorite)

        } catch(err){
            if (err instanceof Error) {
                return res.status(400).json({ message: err.message })
              }
        }
    },
    //Delete //Favorites
    delete: async (req:AuthenticatedRequest, res: Response) =>{
        const userId = req.user!.id
        const courseId = req.params.id
        try{
            const favorite = await favoriteService.delete(userId, Number(courseId))
            return res.status(204).send()
        } catch (err){
            if (err instanceof Error) {
                return res.status(400).json({ message: err.message })
              }
        }

    }
}