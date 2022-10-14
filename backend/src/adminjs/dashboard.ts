import { User } from './../models/Users';
import { Category } from './../models/Category';
import { Episode } from './../models/Episode';
import { Course } from './../models/Course';
import AdminJS, { PageHandler } from "adminjs"



export const dashboardOptions: {
handler?:PageHandler,
component?: string
} = {
    component: AdminJS.bundle('./components/Dashboard'),
    handler: async(req, res, context) =>{
      const courses = await Course.count()
      const episodes = await Episode.count()
      const categories = await Category.count()
      const standardUsers = await User.count({where:{role:'user'}})

      res.json({
        'Cursos': courses,
        'Episódios': episodes,
        'Categorias': categories,
        'Usuários': standardUsers

      })
    }
  }