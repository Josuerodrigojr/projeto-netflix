import { Favorite } from "../models";


export const favoriteService ={
    //Estamos informando que deve ser pegado do usuário, somente onde o userId é igual o userId.
    findByUserId: async(userId: number ) => {
        const favorites = await Favorite.findAll({
            attributes: ['user_id', 'userId'],
            where:{userId},
            include:{
                association: 'course', 
                attributes:['id','name', 'synopsis', ['thumbnail_url', 'thumbanailUrl']]
            }
            
        })
        return {
            userId,
        courses: favorites.map(favorite => favorite.course)}
    },
    create: async (userId:number, courseId:number) =>{
        const favorite = Favorite.create({
            courseId,
            userId
        })
        return favorite
    }
}