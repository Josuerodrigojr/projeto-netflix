import { userResourceOptions } from './user';
import { User } from './../../models/Users';
import { Episode } from './../../models/Episode';
import { episodeResourceOptions, episodeResourceFeatures } from './episode';
import { courseResourceOptions, courseResourceFeatures } from './course';
import { Course } from '../../models/Course';
import { categoryResourceOptions } from './category';
import { Category } from './../../models/Category';
import {ResourceWithOptions} from 'adminjs'


//Tem como propriedade principal a junção de todas as propriedades. Estamnos passando para o AdminJs, quais são os models que ele poderá administrar

export const adminJsResources: ResourceWithOptions[] = [
    {
        resource: Category,
        options: categoryResourceOptions
    },
    {
        resource: Course,
        options: courseResourceOptions,
        features: courseResourceFeatures
      },
    {
        resource: Episode,
        options: episodeResourceOptions,
        features: episodeResourceFeatures
    },
    {
        resource: User,
        options: userResourceOptions
    }   
]