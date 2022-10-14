 // Para que o typescript não reclame quando estiver vazio, podemos colocar uma estrutura padrão que deverá ser seguido 

 import Head from 'next/head'
import HeaderNoAuth from '../src/components/homeNoAuth/headerNoAuth';
 import styles from '../styles/HomeNoAuth.module.scss';

 //Na estrutura do react, criamos um Head, em que será o cabeça~lho da nossa estrutura, além disso, colocamos uma tag main, em que estará o corpo da nossa estrutura.
 
 const HomeNoAuth =() =>{
  return (
    <>
    <Head>
    <title>Onebiflix</title>
    <link rel="shortcut icon" href="/favicon.svg" type="image/x-icon" />
    <meta property='og:title' content='Onebitflix' key="title"/>
    <meta name='description' content='Tenha acesso aos melhors conteúdos de programação de uma forma simples e fácil' />
    </Head>

    <main>
      <HeaderNoAuth/>
    </main>
    </>
  )
 }

 export default HomeNoAuth;