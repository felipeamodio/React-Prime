import axios from 'axios';

// URL filmes em cartaz:
// https://api.themoviedb.org/3/movie/now_playing?api_key=59dd9c2ce68baa370fa44aa83d77120b&language=pt-BR&page=1

export const key = '59dd9c2ce68baa370fa44aa83d77120b';

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3'
})

export default api;