import jwt from 'jsonwebtoken'

const secret = 'chave-do-jwt'

export const jwtService = {
    //O payload é do proprio jwt que vai receber o payload que é os dados que vamos passar dentro do token. Expiration é o tempo de validade da chave token
    singToken: (payload: string | object | Buffer, expiration:string) =>{
        //jwt sign é para assinar o token, devolvendo o token para o usuário. Vai receber o parametro e a chave de codificação.
        return jwt.sign(payload, secret,{
            //ExpiresIn é que vai receber o tempo de validade da minha chave
            expiresIn: expiration})


    },
    //Agora temos que criar um comando para a verificação do token
    verifyToken: (token: string, callbackfn: jwt.VerifyCallback) => {
        jwt.verify(token, secret, callbackfn)
      }
    }