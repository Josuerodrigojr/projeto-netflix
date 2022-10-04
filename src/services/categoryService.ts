import { Category } from './../models/Category';
export const categoryService ={
    findAllPaginated: async (page:number, perPage:number)=>{
        const offset = (page - 1) * perPage
        //Count vai mostrar a quantidade de valores e rows os valores.
        const {count, rows} = await Category.findAndCountAll({
            //Valores que queremos mostrar nas rotas
            attributes: ['id', 'name', 'position'],
            //Ordenação
            order: [['position', 'ASC']], 
            //Limitando a quantidade de elementos por página, e o offset é para pular a quantidade desejada.
            limit: perPage,
            offset
        })
        
        return {
            categories: rows,
            page,
            perPage,
            total:count
        }
    }
}