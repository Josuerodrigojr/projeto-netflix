import {Splide, SplideSlide} from '@splidejs/react-splide';
import "@splidejs/splide/dist/css/splide.min.css"
import { CourseType } from '../../../services/courseService';
import SlideCard from '../slideCard'


//Chamamos novamente a interface de nosso curso, mas, como vamos utilizar todos os arquivos em si, definimos o CourseType[]
interface props {
    course: CourseType[]
}



const SlideComponent = function({course}: props) {

    let slideCount = 0;

    if(course.length > 4){
        slideCount = 4;
    } else {
        slideCount = course.length;
    }
    //Primeiro definimos nosso splide, colocando para que seja do tipo loop, apareça 4 slide por página e pode mover somente uma vez. Logo depois, utilizamos o map para que possa ser retornado para o usuário os cursos em destaque. Vamos usar o breakpoints para fazer nossa reposividade, indicando quando em pixel será quebrada.
    // O arrows e o drag é para a passagem dos cursos, tanto com setas quanto por slide, tornando verdadeiro ou falso de acordo com a quantidade de cursos que foram aprovados no destaque no AdminJs.
    return <>
    <div className={"d-flex flex-column align-items-center py-4"}>
        
        <Splide options={{
            type:'loop',
            perPage: slideCount,
            perMove: 1,
            width: slideCount*300,
            pagination: false,
            arrows: course.length>4 ? true : false,
            drag: course.length>4 ? true : false,
            breakpoints:{
                1200: {
                    perPage: slideCount >= 2 ? 2: 1,
                    width: slideCount >=2 ? 600 : 300,
                    arrows: course.length>2 ? true : false,
                    drag: course.length>2 ? true : false,
                },
                600:{
                    perPage:1,
                    width: 300,
                    arrows: course.length>1 ? true : false,
                    drag: course.length>1 ? true : false,
                },
                300:{
                    width: 250,
                    arrows: course.length>1 ? true : false,
                    drag: course.length>1 ? true : false,
                }
            }
            
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