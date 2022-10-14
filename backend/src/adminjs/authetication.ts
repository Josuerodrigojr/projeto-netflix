import { User } from './../models/Users';
import { AuthenticationOptions } from "@adminjs/express";
import AdminJS from "adminjs";
import bcrypt from 'bcrypt'

export const authtenticationOptions: AuthenticationOptions = {
    //Controle das rotas no proprio ADMIN, construindo as rotas para o programador. 
//Foi alterado o build para authenticate, para colocar que somente administradores podem entrar nessa rota

    authenticate: async (email, password) =>{
      const user = await User.findOne({where:{email}})
  
      if(user && user.role === "admin"){
        const matched = await bcrypt.compare(password, user.password)
        if (matched){
          return user
        }
      }
      return false
    }, cookiePassword: 'senha-de-cookie'
  }
  