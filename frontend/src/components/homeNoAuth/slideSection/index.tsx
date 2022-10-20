import Link from 'next/link';
import { Button, Container } from 'reactstrap';
import { CourseType } from '../../../services/courseService';
import SlideComponent from '../../common/slideComponent';
import styles from './styles.module.scss'

//Fizemos o mesmo esquema, a diferença é que agora vamos usar para que tenha os destaques do curso.
interface props {
    newestCourses: CourseType[];
}

const SlideSection = function ({newestCourses}:props){
    //Primeiro vamos definir para que sempre seja atualizado, pesquisando no backend depois de um determinado tempo.
    return <>
    <Container className="d-flex flex-column align-items-center py-5">
        <p className={styles.sectionTitle}>Aulas já disponíveis</p>
        <SlideComponent course={newestCourses}/>
        <Link href='/'><Button outline color='light' className={styles.slideSectionBtn}>Se cadastre para acessar os cursos</Button></Link>
    </Container>

    </>
}

export default SlideSection;