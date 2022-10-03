
import uploadFileFeature from '@adminjs/upload'
import {ResourceOptions} from 'adminjs'
import path from 'path'


// Vai ser as opções que o meu AdminJs recebe para mexer, a navegação, as propriedades que podem ser alterada, as propriedades que podem ser filtradas, a listagem das propriedades e as propriedades que serão mostradas, caso queira que todas apareçam, não precisa colocar.

export const episodeResourceOptions: ResourceOptions ={
    navigation: 'Catálogo',
  editProperties: ['name', 'synopsis', 'courseId', 'order', 'uploadVideo', 'secondsLong'  ],
  filterProperties: ['name', 'synopsis', 'courseId', 'secondsLong', 'createdAt', 'updatedAt'],
  listProperties: ['id', 'name', 'courseId', 'order', 'secondsLong'],
  showProperties: ['id', 'name', 'synopsis', 'courseId', 'order', 'videoUrl', 'secondsLong', 'createdAt', 'updatedAt']
}

//Para integrar para o admin fazer uploads de arquivos no admin.

export const episodeResourceFeatures: FeatureType[] = [
  uploadFileFeature({
    provider:{
      local:{
        bucket: path.join(__dirname, '..','..','..', 'uploads')
      }
    }, 
    properties:{
      key:'videoUrl',
      file: 'uploadVideo'
    }, 
    uploadPath: (record, filename) => `videos/course-${record.get('courseId')}/${filename}`
  })
]