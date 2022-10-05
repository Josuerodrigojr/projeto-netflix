import { Category } from './../models';

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
    }, 
    //Abaixo será buscado informações pelo id solicitado na controller. Include irá servir para que posa fazer alguma associação dentro, ou seja, a atribuição que fizemos no index dentro da model, estamos pegando a informaçõ dos cursos. Association será o nome da tabela que estamos chamando e novamente o attributes, que será as colunas que quero selecionar. 
    findByIdWithCourses: async(id:string) =>{
        const categoryWithCourses = await Category.findByPk(id, {
            attributes: ['id', 'name'],
            include: {
                association: 'courses',
                attributes: [
                    'id',
                    'name', 
                    'synopsis', 
                    ['thumbnail_url', 'thumbnailUrl']
                ]
            }
        })
        return categoryWithCourses
    }
}