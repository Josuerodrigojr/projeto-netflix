import { AuthenticatedRequest } from './../middlewares/auth';
import { Favorite } from '../models/Favorite';

import { favoriteService } from "../services/favoriteService";
import {Request, Response} from 'express'


export const favoritesController = {
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
    }
}