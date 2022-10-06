import { jwtService } from './../services/jwtService';
import { userService } from './../services/userService';
import { Request, Response } from 'express';


export const authController = {
    //POST /auth/register
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
},

//POST /auth/login
login: async (req:Request, res:Response) =>{
    const {email, password} = req.body

    try{
        const user = await userService.findByEmail(email)
        if (!user) return res.status(401).json({message: 'E-mail não registrado'})

        user.checkPassword(password, (err, isSame) =>{
            if (err) return res.status(400).json({message: err.message})
            if (!isSame) return res.status(401).json({message:"Senha incorreta"})
            const payload = {
                id: user.id,
                firstName: user.firstName.replace,
                email: user.email
            }
            const token = jwtService.singToken(payload, '1d')
            return res.json({authenticated:true, ...payload, token})
        })
    } catch(err){
        if (err instanceof Error){
            return res.status(400).json({message: err.message})
        }
       }
}
}

