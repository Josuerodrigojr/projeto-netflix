import { Container } from 'reactstrap'
import styles from './styles.module.scss'

const CardsSection = function (){
    return <>
    <p  className={styles.sectionTitle}>O que você vai acessar!!!</p>
    <Container className='d-flex flex-wrap justify-content-center gap-4 pb-5'>
        <div className={styles.card1}>
            <p className={styles.cardTitle}>
                Front-End
            </p>
            <p className={styles.cardDescription}>
            Front-end: o que é e como funciona? O Front-end está muito relacionado com a interface gráfica do projeto. Ou seja, é onde se desenvolve a aplicação com a qual o usuário irá interagir diretamente, seja em softwares, sites, aplicativos, etc.
            </p>
        </div>
        <div className={styles.card2}>
            <p className={styles.cardTitle}>
                Back-End
            </p>
            <p className={styles.cardDescription}>
            O backend é a estrutura que possibilita a operação do sistema, enquanto o front-end é responsável pela parte visual, como apresentação, design, linguagens, cores, entre outros. Mesmo tendo papéis diferentes, essas aplicações estão ligadas intimamente para que os ambientes eletrônicos operem em sincronia.
            </p>
        </div>
        <div className={styles.card3}>
            <p className={styles.cardTitle}>
                Git e Github
            </p>
            <p className={styles.cardDescription}>
            GitHub é uma plataforma para gerenciar seu código e criar um ambiente de colaboração entre devs, utilizando o Git como sistema de controle. Ele vai facilitar o uso do Git, escondendo alguns detalhes mais complicados de setup. É lá que você provavelmente vai ter seu repositório e usar no dia a dia.
            </p>
        </div>
        <div className={styles.card4}>
            <p className={styles.cardTitle}>
                Projetos
            </p>
            <p className={styles.cardDescription}>
            Os objetivos do projeto consistem no que você planeja alcançar ao final do seu projeto. Isso pode incluir entregáveis e ativos, ou objetivos mais intangíveis, como o aumento da produtividade ou da motivação.
            </p>
        </div>
        <div className={styles.card5}>
            <p className={styles.cardTitle}>
                Mobile
            </p>
            <p className={styles.cardDescription}>
            Uma aplicação móvel ou aplicativo mobile é um software desenvolvido para ser instalado em smartphones e iPads. 
            </p>
        </div>
        <div className={styles.card6}>
            <p className={styles.cardTitle}>
                Carreira
            </p>
            <p className={styles.cardDescription}>
            Qual a definição de carreira?
Carreira: é a sua trajetória profissional, a soma de todas as experiências de trabalho, bem como de estudo e profissionalização que levaram você até determinado ponto. 
            </p>
        </div>
        
        
    </Container>
    </>
}

export default CardsSection