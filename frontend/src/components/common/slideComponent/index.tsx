import {Splide, SplideSlide} from '@splidejs/react-splide';
import "@splidejs/splide/dist/css/splide.min.css"
import { CourseType } from '../../../services/courseService';
import SlideCard from '../slideCard'


//Chamamos novamente a interface de nosso curso, mas, como vamos utilizar todos os arquivos em si, definimos o CourseType[]
interface props {
    course: CourseType[]
}



const SlideComponent = function({course}: props) {
    //Primeiro definimos nosso splide, colocando para que seja do tipo loop, apareça 4 slide por página e pode mover somente uma vez. Logo depois, utilizamos o map para que possa ser retornado para o usuário os cursos em destaque.
    return <>
    <div>
        
        <Splide options={{
            type:'loop',
            perPage: 4,
            perMove: 1,
            pagination: false,
            
        }}>
            {course?.map((course)=>(
                <SplideSlide key={course.id}>
                    <SlideCard course={course} />
                </SplideSlide>
            ))}
        </Splide>
    </div>

    </>
}

export default SlideComponent