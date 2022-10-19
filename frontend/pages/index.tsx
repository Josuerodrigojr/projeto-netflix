 // Para que o typescript não reclame quando estiver vazio, podemos colocar uma estrutura padrão que deverá ser seguido 

 import { GetStaticProps } from 'next';
import Head from 'next/head'
import HeaderNoAuth from '../src/components/homeNoAuth/headerNoAuth';
import PresentationSection from '../src/components/homeNoAuth/presentationSection';
import SlideSection from '../src/components/homeNoAuth/slideSection/';
import courseService from '../src/services/courseService';
 import styles from '../styles/HomeNoAuth.module.scss';
 import {ReactNode} from 'react'
import {CourseType} from '../src/services/courseService'


 interface IndexPageProps {
  chrilden?: ReactNode;
  course: CourseType[];
 }

 const HomeNoAuth =({course}: IndexPageProps) =>{
  return (
    <>
    <Head>
    <title>Onebiflix</title>
    <link rel="shortcut icon" href="/favicon.svg" type="image/x-icon" />
    <meta property='og:title' content='Onebitflix' key="title"/>
    <meta name='description' content='Tenha acesso aos melhors conteúdos de programação de uma forma simples e fácil' />
    </Head>

    <main>
      <div className={styles.sectionBackground}>
      <HeaderNoAuth/>
      <PresentationSection/>
      </div>
      <SlideSection newestCourses={course}/>
    </main>
    </>
  )
 }
 //Na estrutura do react, criamos um Head, em que será o cabeça~lho da nossa estrutura, além disso, colocamos uma tag main, em que estará o corpo da nossa estrutura. Colocamos que a acada um dia terá que fazer a atualização.
 
 export const getStaticProps: GetStaticProps = async () =>{
  const res = await courseService.getNewestVourses();
  return {
    props: {
      course: res.data,
    },
    revalidate: 3600 * 24
  }
 }

 export default HomeNoAuth;