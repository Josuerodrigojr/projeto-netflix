import { categoryResourceOptions } from './category';
import { Category } from './../../models/Category';
import {ResourceWithOptions} from 'adminjs'


//Tem como propriedade principal a junção de todas as propriedades. Estamnos passando para o AdminJs, quais são os models que ele poderá administrar

export const adminJsResources: ResourceWithOptions[] = [
    {
        resource: Category,
        options: categoryResourceOptions
    }    
]