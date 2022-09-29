import { adminJS, adminJsRouter } from './adminjs/index';

import { sequelize } from './index';
import express from "express"

const app = express()
// Para fazer com que tudo dentro de uma pasta seja arquivos estáticos
app.use(express.static('public'))


//Como fariamos em um app.use, passamos o caminho e as rotas que iremos tormar.
app.use(adminJS.options.rootPath, adminJsRouter)

const PORT = process.env.PORT || 3000

app.listen(PORT, () =>{
    sequelize.authenticate().then(()=>{
        console.log("Foi a conexão com o banco de dados")
    })
    console.log(`O servidor está no ar na porta ${PORT}`)
})