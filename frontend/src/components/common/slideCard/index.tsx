import styles from './styles.module.scss'
import { CourseType } from '../../../services/courseService'

//Vamos utilizar uma props que será o nosso curso, passando do backend para o frontend
interface props {
    course:CourseType;
}

//Vamos definir que o course será uma props, props é o componente filhjo que podemos acessar os valores de nosso backend.
const slideCard = function ({course}:props){
    return <>
    <div className={styles.slide}>
        <img src={`${process.env.NEXT_PUBLIC_BASEURL}/${course.thumbnailUrl}`} alt={course.name} className={styles.slideImg}/>
        <p className={styles.slideTitle}>{course.name}</p>
        <p className={styles.slideDescription}>{course.synopsis}</p>
    </div>
    </>

}

export default slideCard