import { UserInstance } from './../models/Users';
import { userService } from './../services/userService';
import { jwtService } from './../services/jwtService';
import { NextFunction, Request, Response } from 'express';
import { JwtPayload } from 'jsonwebtoken';

export interface AuthenticatedRequest extends Request {
    user?: UserInstance | null
  }


//Vamos primeiro verificar se está autorizado.

export function ensureAuth(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    //Primeiro, vamos armazenar a autorização no headers.

    const authorizationHeader = req.headers.authorization
    //Agora , vamos verificar se a autorização é válida, se não for, vamos retornar uma mensagem de erro para o usuário

    if (!authorizationHeader) {
        return res.status(401).json({ message: 'Não autorizado: nenhum token encontrado' })
      }

    //O token será retornando com um texto de /Bearer na frente, logo, se não foi passado pelo if anterior, significa que foi armazenado um token. O programa irá verificar o que recebeu, e no lugar do /Bearer / irá substituir por ' '.

    const token = authorizationHeader.replace(/Bearer /, '')

    //Abaixo, iremos verificar se o token é válido, será retornado o token, o err e a decodificação
    jwtService.verifyToken(token, async (err, decoded) => {
        // Temos que fazer a verificação se existir algum erro ou a decodificação é voltada como undefined. Se for verdadeiro, retornamos uma mensagem de erro para o usuário. Como ele passou pelo if da linha doze, significa que tem um token, mas, se está no erro, que o token é inválido.
        if (err || typeof decoded === 'undefined') {
            return res.status(401).json({ message: 'Não autorizado: token inválido' })
          }

        //Após a validação do token, vamos verificar o email do usuário e armazenar. O req.user deve ser importado de uma extensão. Iremos armazenar todas as propriedades do nosso usuário.
        const user = await userService.findByEmail((decoded as JwtPayload).email)
            req.user = user
            next()
        })
      }

      //Abaixo irá parecer um pouc repetitivo, mas, serve para que possamos autenticar o usuário nas visualizações dos episódios, e o token ser buscado na nossa query.

      export function ensureAuthViaQuery (req: AuthenticatedRequest, res: Response, next: NextFunction){
        const {token} = req.query

        if(!token){
            return res.status(401).json({ message: 'Não autorizado: nenhum token encontrado' })
        }

        if (typeof token !== 'string'){
            return res.status(400).json({message: 'O parâmetro token não é uma string'})

        }

        //Abaixo, iremos verificar se o token é válido, será retornado o token, o err e a decodificação
    jwtService.verifyToken(token, async (err, decoded) => {
        // Temos que fazer a verificação se existir algum erro ou a decodificação é voltada como undefined. Se for verdadeiro, retornamos uma mensagem de erro para o usuário. Como ele passou pelo if da linha doze, significa que tem um token, mas, se está no erro, que o token é inválido.
        if (err || typeof decoded === 'undefined') {
            return res.status(401).json({ message: 'Não autorizado: token inválido' })
          }

        //Após a validação do token, vamos verificar o email do usuário e armazenar. O req.user deve ser importado de uma extensão. Iremos armazenar todas as propriedades do nosso usuário.
        const user = await userService.findByEmail((decoded as JwtPayload).email)
            req.user = user
            next()
        })


      }