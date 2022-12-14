import { adminJS, adminJsRouter } from './adminjs/index';

import { sequelize } from './index';
import express from "express"
import cors from 'cors'
import {router} from './routes'

const app = express()
// Para fazer com que tudo dentro de uma pasta seja arquivos estáticos
app.use(express.static('public'));
//Indicando que podemos mandar para o programa o formato json
app.use(express.json())
//Para que a apalicação utilize as rotas já definidas.

app.use(router)
//Utilizando o cors, podemos alterar e colocar as origens que podemos receber requisições, quais são os CRUD que podem utilizar. 
app.use(cors())

//Como fariamos em um app.use, passamos o caminho e as rotas que iremos tormar.
app.use(adminJS.options.rootPath, adminJsRouter)

const PORT = process.env.PORT || 3000

app.listen(PORT, () =>{
    sequelize.authenticate().then(()=>{
        console.log("Foi a conexão com o banco de dados")
    })
    console.log(`O servidor está no ar na porta ${PORT}`)
})