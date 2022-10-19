import api from './api'

//Pelo que eu entendi, é algo semelhante a criação de tabelas, vamos colcoar o modelo das colunas e os tipos.

export type EpisodeType ={
    id: number;
    name: string;
    synopsis: string;
    order: number;
    videoUrl: string;
    secondsLong: number;
}

export type CourseType ={
    id: number;
    name: string;
    thumbnailUrl: string;
    synopsis: string;
    episodes?: EpisodeType[]
}

//O serviço do nosso curso

const courseService = {
    getNewestVourses: async () =>{
        //Vamos solicitar abaixo uma resposta do nosso local host do backend. Caso não consiga uma resposta do nosso servidor, será mostrado uma mensagem de erro. Caso consiga, é retornado nossa resposta.
        const res = await api.get('/courses/newest').catch((error) => {
            console.log(error.response.data.message);

            return error.response;
        });
        return res
    }
}

export default courseService