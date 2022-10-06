import { UserCreationAttributes } from './../models/Users';
import { User } from './../models';
import { Response, Request } from 'express';


export const userService = {
    findByEmail: async(email:string)=>{
        //Será procurado abaixo o email e retornar
        const user = User.findOne({
           
            where:{
                email
            }

        })
        return user
    },
    //abaixo temos a criação do usuário
    create: async(attributes: UserCreationAttributes) =>{
        const user = await User.create(attributes)
        return user
    }
}
