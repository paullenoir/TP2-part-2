<template>
    <div id="index">
        <input id="searchBar" type="text" placeholder=" Recherche ..." v-model="filterName">
        <ul v-if="filterName.length < 3" class="films" >
            <h2>Les 3 derniers films ajoutés</h2>
            <li v-for="film in filterFilm" :key="film.id">
                <FilmsList :film="film"></FilmsList>
            </li>
        </ul>
        <ul v-else>
            <ul v-if="noSearchResponse">
                <h2>Aucun film correspondant à la recherche</h2>
            </ul>
            <ul v-else>
                <h2>Films recherches :{{paginatedFilms.length}}</h2>
                <li v-for="film in paginatedFilms" :key="film.id">
                    <FilmSearched :film="film"></FilmSearched>
            </li>

                <ul v-if="pageNumber !== 1">
                    <button class="beforeButton" @click="pageNumber -= 1">Before</button>
                </ul>
                <ul v-else>
                    <button class="beforeButton" @click="pageNumber -= 1" disabled>Before</button>
                </ul>
                <ul v-if="pageNumber !== pageCount" >
                    <button class="nextButton" @click="pageNumber += 1">Next</button>
                </ul>
                <ul v-else >
                    <button class="nextButton" @click="pageNumber += 1" disabled>Next</button>
                </ul>
               
            </ul>
        </ul>
    </div>
</template>

<script>
    import ApiServices from '../services/ApiServices.js';
    import FilmSearched from "./FilmSearched";
    import FilmsList from "../views/FilmsList";

    export default {
        name: "index",
        data() {
            return {
                films: [],
                films2: [],
                lastPage: "",
                isActive: false,
                filmSearched: [],
                pageSize: 20,
                pageNumber: 1,
                filterName: "",
                noSearchResponse: true,
            };
        },
        components: {
            FilmsList,
            FilmSearched,
        },
        created(){
            ApiServices.getFirstFilms()
                .then(response => {
                    this.films = response.data;
                    this.lastFilm();
                    console.log("2-page index");
                })
                .then(() => {
                    ApiServices.getLastFilm(this.lastPage)
                    .then(response => {
                        this.films2 = response.data;
                        if(this.films2.data.length < 3){
                        this.lastPage --;
                        ApiServices.getLastFilm(this.lastPage)
                            .then(response => {
                            let countFilmToAdd = 3 - this.films2.data.length;
                            for(let i = 0; i < countFilmToAdd; i++){
                                this.films2.data.push(response.data.data[19 - i]);
                            } 
                            })
                        }
                })
                })
                .catch(error =>{
                    console.log('erreur de data : ', error.response)
                })
        },
        watch: {
            filterName(keyword) {
                if (this.filterName === "") {
                    this.resetSearchArray();
                }
                if (this.filterName.length + 1 >= 2) {
                    this.searchFilm(keyword);
                }
            }
        },
        methods:{
            lastFilm() {
                this.lastPage = this.films.meta.last_page;
                return 0;
            },
            reverveArray(anArray){
                let listFilms = anArray.data;
                listFilms.sort((a, b) => (a.id < b.id) ? 1 : -1);
                return listFilms;
            },
            searchFilm(keyword) {
                ApiServices.searchFilmWithKeyWord(keyword)
                    .then(response => {
                        this.filmSearched = response.data["data"];
                        if (this.filmSearched.length === 0) {
                            this.noSearchResponse = true;
                        } else {
                            this.noSearchResponse = false;
                        }
                    })
                    .catch(error => {
                        console.log('erreur de data : ', error.response)
                    });
            },
            resetSearchArray() {
                while (this.filmSearched.length > 0) {
                    this.filmSearched.pop();
                }
            },
        },

        computed: {
            filterFilm(){
                let listFilms = this.reverveArray(this.films2);
                let newList = listFilms.slice(0,3);
                return newList;
            },
            pageCount() {
                let length = this.filmSearched.length,
                    size = this.pageSize;
                return Math.ceil(length / size);
            },
            paginatedFilms() {
                const start = (this.pageNumber - 1) * this.pageSize,
                    end = start + this.pageSize;
                let listSearchedFilm = this.filmSearched;
                listSearchedFilm.sort((a, b) => (a.release_year > b.release_year) ? 1 : -1);
                return listSearchedFilm.slice(start, end);
            },
        },
    }

</script>
