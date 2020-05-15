import axios from 'axios'

var token = localStorage.token

const apiClient = axios.create({
    baseURL: 'http://radiant-plains-67953.herokuapp.com/api/',
    header:{
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: "Bearer " + token
    }
})

const RESSOURCE_FILM = 'films';

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
    getUserById(id){
        let fullUrl = "users/" + id;
        return apiClient.get(fullUrl);
    }
}