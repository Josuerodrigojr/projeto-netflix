import styles from './styles.module.scss'
import {Container, Row, Col, Button} from 'reactstrap'
import Link from 'next/link';


const PresentationSection = function () {
    //No container, colocamos o className='py-4' para que possamos colocar a distância entre as páginas configuradas lá no meu index na pasta page.
    //Na segunda linha e primeira coluna, que colocamos o classname, é para podermos alinhar sem precisar criar uma nova classe para isso. Mesmo esquema na primeira linha e primeira coluna.
    return <>
    
    <Container className='py-4'>
        <Row>
            <Col md className='d-flex flex-column justify-content-center align-items-start'>
                <p className={styles.subTitle}>Acesso ilimitado</p>
                <p className={styles.title}>Tenha acesso aos melhores <br/> tutorias de Programação.</p>
                <p className={styles.description}>Estude de onde estiver, a qualquer momento, e continue <br/> evoluindo como programador </p>
                <Link href='/register'>
                <Button outline className={styles.btnCta}>
                    ACESSE AGORA <img src='/buttonPlay.svg' alt="buttonImg" className={styles.btnImg}/>
                </Button>
                </Link>
            </Col>
            <Col md>
                <img src='/homeNoAuth/imgPresentation.png' alt='imgIndex' className={styles.imgPresentation}/>
            </Col>
        </Row>
        <Row>
            <Col className='d-flex justify-content-center pt-5'>
            <img src='/homeNoAuth/iconArrowDown.svg' alt='arrowDown' className={styles.arrowDown}/>
            </Col>
        </Row>
    </Container>
    </>
}

export default PresentationSection