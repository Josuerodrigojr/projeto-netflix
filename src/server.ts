import { sequelize } from './index';
import express from "express"

const app = express()

const PORT = process.env.PORT || 3000

app.listen(PORT, () =>{
    sequelize.authenticate().then(()=>{
        console.log("Foi a conexão com o banco de dados")
    })
    console.log(`O servidor está no ar na porta ${PORT}`)
})