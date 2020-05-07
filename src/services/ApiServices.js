import axios from 'axios'

const apiClient = axios.create({
    baseURL: 'http://radiant-plains-67953.herokuapp.com/api/',
    header:{
        Accept: 'application/json',
        'Content-Type': 'application/json'
    }
})

const RESOURCE_NAME = 'films';

export default{
    getFirstFilms(){
        return apiClient.get(RESOURCE_NAME)
    },
    getLastFilm(lastPage){
        let fullUrl = RESOURCE_NAME + "?page=" + lastPage;
        return apiClient.get(fullUrl);
    },
    getFilmWithId(id){
        let fullUrl = RESOURCE_NAME + "/" + id;
        return apiClient.get(fullUrl);
    },
    searchFilmWithKeyWord(keyword){
        let fullUrl = RESOURCE_NAME +"?keyword="+ keyword;
        return apiClient.get(fullUrl);
    },
    getActorByFilmID(id){
        let fullUrl = RESOURCE_NAME + "/" + id +"/actors";
        return apiClient.get(fullUrl);
    }
}