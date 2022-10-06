import { userService } from './../services/userService';
import { Request, Response } from 'express';


export const authController = {
   register: async (req:Request, res:Response) => {
    //Estamos utilizando a destruturação para obter do corpo o primeiro nome, último nome, email, senha, data de nascimento e telefone
    const { firstName, lastName, email, password, birth, phone} = req.body

   
   try{
    //Agora iremos verificar se o usuário que está tentando se cadastrar existe

    const userAlreadyExists = await userService.findByEmail(email)
    if (userAlreadyExists){
        throw new Error ("Este e-mail já está cadastrado.")
    } 
    const user = await userService.create({
        //O role é para verificar se o usuário que está se cadastrando é usuário ou administrador
        firstName,
        lastName,
        email,
        password,
        phone, 
        birth, 
        role: 'user'
    })

    return res.status(201).json(user)

   } catch(err){
    if (err instanceof Error){
        return res.status(400).json({message: err.message})
    }
   }
}
}

