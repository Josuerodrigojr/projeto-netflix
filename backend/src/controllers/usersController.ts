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

    //PUT/users/current

    update:async (req:AuthenticatedRequest, res: Response) => {
        const {id} = req.user!
        const {firstName, lastName, phone, birth, email} = req.body

        try{
            const updatedUser = await userService.update(id, {
                firstName,
                lastName,
                phone,
                email,
                birth
              })
              return res.json(updatedUser)

        } catch(err){
            if (err instanceof Error) {
                return res.status(400).json({ message: err.message })
              }

        }
        
    },

    //PUT/users/current/password

    updatePassword: async(req: AuthenticatedRequest, res: Response) =>{
        const user = req.user!
        const {currentPassword, newPassword} = req.body

        try{
            user.checkPassword(currentPassword, async(err, iSame)=>{
                if (err) return res.status(400).json({message: err.message})
                if(!iSame) return res.status(400).json({message: "Senha incorreta"})

                await userService.updatePassword(user.id, newPassword)
                return res.status(204).send()
            })

        } catch(err){
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