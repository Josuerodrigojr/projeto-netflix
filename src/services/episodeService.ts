import { WatchTime } from '../models/WatchTime';

import { WatchTimeAttributes } from '../models/WatchTime';

import { Response } from 'express';
import path from 'path'
import fs from 'fs'


export const episodeService = {
    streamEpisodeToResponse: (res:Response, videoUrl:string, range:string|undefined) =>{
          //Devemos acessar a pasta em que o video se encontra
          const filePath = path.join(__dirname, '..', '..', 'uploads', videoUrl)
          //Para armazenar os dados do caminho do video
          const fileStat = fs.statSync(filePath)
         
          //O comando abaixo irá carregar da parte que clicar no video
          if (range){
              const parts = range.replace(/bytes=/,'').split('-')

              const start = parseInt(parts[0],10)
              //O comando abaixo faz uma verificação caso tenha uma segunda parte, será pegada, caso não, irá pegar todo o restante do arquivo

              const end = parts[1] ? parseInt(parts[1],10) : fileStat.size
              
              //O tamanbho do pedaço que queremos.
              const chunckSize = (end - start) + 1

              //O arquivo abaixo irá ler o arquivo
              const file = fs.createReadStream(filePath, {start, end})
              
              const head ={
                  'Content-Range': `bytes ${start}-${end}/${fileStat.size}`,
                  'Accept-Ranges': 'bytes',
                  'Content-Lenght': chunckSize,
                  'Content-Types': 'video/mp4'
              }
              //Estamos devolvendo uma parte do video
              res.writeHead(206, head)
              
              //O pipe serve para devolver a resposta obtida no file.

              file.pipe(res)
          } else {
              //o else é caso não consiga pegar a parte do video que o usuário parou, mas sim, o video desde o começo

              const head ={
                  'Content-Lenght': fileStat.size,
                  'Content-Types': 'video/mp4'
              }
              //Estamos devolvendo uma parte do video
              res.writeHead(200, head)

              fs.createReadStream(filePath).pipe(res)

          }
          

          

    },

    getWatchTime: async (userId: number, episodeId: number) => {
        const watchTime = await WatchTime.findOne({
            attributes: ['seconds'],
            where: {
                userId,
                episodeId
            }
        })

        return watchTime
    },

	  setWatchTime: async ({ userId, episodeId, seconds }: WatchTimeAttributes) => {
        const watchTimeAlreadyExists = await WatchTime.findOne({
            where: {
                userId,
                episodeId
            }
        })

        if (watchTimeAlreadyExists) {
            watchTimeAlreadyExists.seconds = seconds
            await watchTimeAlreadyExists.save()

            return watchTimeAlreadyExists
        } else {
            const watchTime = await WatchTime.create({
                userId,
                episodeId,
                seconds
            })
    
            return watchTime
        }
    }
}