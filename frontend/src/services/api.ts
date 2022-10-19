//Aqui iremos fazer nossa conexão com o backend

import axios from "axios";

//Pegando e armazenando nossa base da url

const baseURL = process.env.NEXT_PUBLIC_BASEURL;

//fazendo a conexão do axos com a base url

const api = axios.create({
    baseURL,
})

export default api;