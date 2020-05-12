<template>
    <div id="fullFilmSection">
        <div id="premiereSection">
                <h2>Description du film</h2>
                <h3><span class="underligne">Titre:</span> <br>
                        {{films.title}}
                </h3>
                <img v-if="films.image != null" :src="films.image ? films.image : 'https://placeimg.com/200/200/tech'"/>
                <p v-else>Image non disponible</p>
                <p><span class="underligne">Synopsis:</span><br> {{films.description}}</p>
                <p><span class="underligne">Durée:</span><br> {{Hours}}:{{Min}}</p>
                <p><span class="underligne">Classement:</span><br> {{films.rating}}</p>
                <p><span class="underligne">Année de parution:</span><br> {{films.release_year}}</p>
                <p><span class="underligne">Acteur(s):</span></p>
                <div v-if="Actors.length !== 0">
                <ul>
                <li v-for="actor in Actors" :key="actor.id">
                        <p>{{actor.first_name}} {{actor.last_name}}</p>
                </li>
                </ul>
                </div>
                <p v-else>Aucun acteur pour ce film</p>
                <p><span class="underligne">Score:</span></p>
                <star-rating :value="Score" disabled="True"></star-rating>
                <router-link to="/"><button id="lien">Return</button></router-link>
        </div>
        <div id="deuxiemeSection" :class="{active2Section: token}">
                <h2>Ajouter une critique</h2>
        </div>
        <div id="troisiemeSection" :class="{active3Section: token}">
                <h2>Commentaires</h2>
        </div>
    </div>
</template>

<script>
        import ApiServices from '../services/ApiServices.js';
        import StarRating from "../components/StarRating";

        export default {
            components: {StarRating},
            props: {
                id: {
                    type: Number,
                    default:0
                }
        },
        data(){
            return{
                films:{
                        type: Object,
                        default: null
                },
                Actors:{
                        type: Array,
                        default: []
                },
                Hours:{
                        type:Number,
                        default:0
                },
                Min:{
                        type:Number,
                        default:0
                },
                Score:{
                    type:Number,
                    default:0
                },
                token: true
            };
                },
                created(){
                        ApiServices.getFilmWithId(this.id)
                                .then(response => {
                                        this.films = response.data['film'];
                                        this.changeLengthToHours(this.films.length);
                                        this.calculScore(response.data['critic'])
                                })
                                .catch(error =>{
                                        console.log('Erreur de data : ', error.response)
                                });
                        ApiServices.getActorByFilmID(this.id)
                                .then(response => {
                                        this.Actors = response.data;
                                })
                                .catch(error =>{
                                        console.log('Erreur de data : ', error.response)
                                });
                },
                methods:{
                        changeLengthToHours(lengthOfMovie){
                                this.Hours = Math.floor(lengthOfMovie/60);
                                this.Min = lengthOfMovie % 60;
                        },
                    calculScore(critics){
                            let score = 0;
                            for(let i = 0; i < critics.length;i++){
                                score += parseFloat(critics[i].score);
                            }
                            this.Score = ((score/critics.length)/100)*5;

                    },
                },
                mounted() {
                        if (localStorage.token) {
                                this.token = false;
                                console.log(this.token);
                        }
                        else{
                                this.token = true;
                        }
                }
        }
</script>
