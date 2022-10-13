import { Response } from 'express';
import { userService } from './../services/userService';
import { AuthenticatedRequest } from './../middlewares/auth';
export const usersController = {
    //GET/users/current
    show: async(req: AuthenticatedRequest, res: Response) =>{
        const currentUser = req.user!
        try{
            return res.json(currentUser)
        } catch (err){
            if (err instanceof Error) {
                return res.status(400).json({ message: err.message })
              }
        }
    },

    //GET/users/current/watching
    //O authenticatedRequest será usado somente quando a rota precisar de autenticação para ser usada.
    watching: async(req:AuthenticatedRequest, res: Response) => {
        const {id} = req.user!
        try{
            const watching = await userService.getKeepWatchingList(id)
            return res.json(watching)
        }catch(err){
            if (err instanceof Error) {
                return res.status(400).json({ message: err.message })
              }
        }
    }
}