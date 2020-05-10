import axios from 'axios'

const apiClient = axios.create({
    baseURL: 'http://radiant-plains-67953.herokuapp.com/api/',
    header:{
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer {token}'
    }
})

const RESSOURCE_FILM = 'films';
const RESSOURCE_USERS = 'users';

export default{
    getFirstFilms(){
        return apiClient.get(RESSOURCE_FILM)
    },
    getLastFilm(lastPage){
        let fullUrl = RESSOURCE_FILM + "?page=" + lastPage;
        return apiClient.get(fullUrl);
    },
    getFilmWithId(id){
        let fullUrl = RESSOURCE_FILM + "/" + id;
        return apiClient.get(fullUrl);
    },
    searchFilmWithKeyWord(keyword){
        let fullUrl = RESSOURCE_FILM +"?keyword="+ keyword;
        return apiClient.get(fullUrl);
    },
    getActorByFilmID(id){
        let fullUrl = RESSOURCE_FILM + "/" + id +"/actors";
        return apiClient.get(fullUrl);
    },
    getUsersLogin(){
        let fullUrl = RESSOURCE_USERS + "/login"
        return apiClient.get(fullUrl);
    }
}