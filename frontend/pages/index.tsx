 // Para que o typescript não reclame quando estiver vazio, podemos colocar uma estrutura padrão que deverá ser seguido 

 import Head from 'next/head'
 import styles from '../styles/HomeNoAuth.module.scss';

 //Na estrutura do react, criamos um Head, em que será o cabeça~lho da nossa estrutura, além disso, colocamos uma tag main, em que estará o corpo da nossa estrutura.
 
 const HomeNoAuth =() =>{
  return (
    <>
    <Head>
    <title>Home</title>
    </Head>

    <main></main>
    </>
  )
 }

 export default HomeNoAuth;