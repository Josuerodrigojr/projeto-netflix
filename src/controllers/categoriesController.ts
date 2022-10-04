import {Request, Response} from 'express'
import {Category} from '../models'


//Controlando o que queremos receberr do banco de dados e como deverá ser mostrado nas nossas rotas.
export const categoriesController ={
    index: async (req: Request, res:Response) =>{
        try {const categories = await Category.findAll({
            //Valores que queremos mostrar nas rotas
            attributes: ['id', 'name', 'position'],
            //Ordenação
            order: [['position', 'ASC']]
        })

        

        return res.json(categories)}
        catch(err){
            if (err instanceof Error){
                return res.status(400).json({message: err.message})
            }
        }
    }
} 