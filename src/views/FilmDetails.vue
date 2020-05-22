<template>
    <div id="fullFilmSection">
        <h2>Description du film</h2>
        <div id="premiereSection">
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
                <div id="formAddCritic">
                        <div class="form-group" :class="{ 'form-group--error': $v.score.$error }">
                                <label class="form__label">Score: </label>
                                <input class="form__input" v-model="score" v-model.trim="$v.score.$model"/>
                        </div>
                        <div class="error" v-if="!$v.score.required">Le champs est requis</div>
                        <div class="error" v-if="!$v.score.maxValue">La valeur maximum est {{$v.score.$params.maxValue.max}}.</div>
                        <div class="error" v-if="!$v.score.minValue">La valeur maximum est {{$v.score.$params.minValue.min}}.</div>
                        <br>
                        <div class="form-group" :class="{ 'form-group--error': $v.comments.$error }">
                                <label class="form__label">Commentaire: </label>
                                <input class="form__input" v-model="comments" v-model.trim="$v.comments.$model" id="commentArea"/>
                        </div>
                        <div class="error" v-if="!$v.comments.required">Le champs est requis</div>
                        <div class="error" v-if="!$v.comments.maxLength">Le champs doit faire moins de {{$v.comments.$params.maxLength.max}} caractères.</div>

                        <button id="lien" class="button" type="submit"  @click="addCritic()">{{textButton}}</button>
                        <p class="typo__p" v-if="submitStatus === 'OK'">{{textButton}} efféctué</p>
                        <p class="typo__p" v-if="submitStatus === 'ERROR'">Slp, remplir le champs correctement</p>
                </div>
                                
        </div>

        <h2>Commentaires</h2>
        <div id="troisiemeSection" :class="{active3Section: token}">
                
                <div  class="flex-container">
                        <li v-for="(critic) in critics" :key="critic.id">  
                                <div id="essai">
                                        <comments :critic="critic" v-if="isUserCritic(critic.id) != true"></comments>
                                </div>

                        </li>
                </div>
        </div>
        <br>
        <div id="quatriemeSection" :class="{active4Section: role_id}">
                <h2>Modifier ou Supprimer un film</h2>
                <button id="lien" @click="onSelect()" style="margin-bottom:30px;">Formulaire</button>
        </div>
    </div>
</template>

<script>
        import ApiServices from '../services/ApiServices.js';
        import StarRating from "../components/StarRating";
        import comments from '../views/comments.vue';
        import {required, decimal, maxValue, minValue, maxLength} from 'vuelidate/lib/validators'
        import axios from 'axios'
        

        export default {
                components: {
                                StarRating,
                                comments
                        },
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
                                textButton: "Ajouter",
                                token: true,
                                role_id: true,
                                score:0,
                                comments:"",
                                submitStatus: null,
                                critics:{
                                        type: Object,
                                        default: null
                                },
                                hasCritic: false,
                                criticId:""
                        };
                },
                validations: {
                        score: {
                                required,
                                decimal,
                                maxValue: maxValue(100),
                                minValue: minValue(0)
                        },
                        comments:{
                                required,
                                maxLength: maxLength(255)
                        }
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
                        ApiServices.getFilmWithId(this.id)
                                .then(response =>{
                                        this.critics = response.data['critic'];
                                        this.makedCritic(localStorage.user_id);
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
                        addCritics(){
                                var mesDonnees = new FormData();
                                mesDonnees.append("user_id",localStorage.user_id);
                                mesDonnees.append("film_id",this.films.id);
                                mesDonnees.append("score",this.score);
                                mesDonnees.append("comment",this.comment);
                                axios({method: "post",url:'http://radiant-plains-67953.herokuapp.com/api/films/' + this.films.id + "/critics",
                                data : mesDonnees
                                })
                                .then(this.submitStatus = "OK")
                                .catch(error =>{
                                        console.log('erreur de data : ', error.response),
                                        this.submitStatus = "ERROR"
                                        }
                                );
                        },
                        makedCritic(user_id){
                                for (let [key] of Object.entries(this.critics)) {
                                        if(this.critics[key].user_id == user_id){
                                                this.criticId = this.critics[key].id
                                                this.hasCritic = true;
                                                this.fillForm(key);
                                        }
                                        
                                }
                        },
                        fillForm(key){
                                this.comments = this.critics[key].comment;
                                this.score = this.critics[key].score;
                        },
                        isUserCritic(aCriticId){
                                let isSameCritic = false
                                if(aCriticId == this.criticId){
                                        isSameCritic = true
                                }
                                return isSameCritic
                        },
                        onSelect(){
                                this.$router.push({ name: "modifyFilm", params: { film: this.films, isPass: true  } });
                        }
                },
                mounted() {

                        if (localStorage.token) {
                                this.token = false;
                                console.log(this.token);
                        }
                        else{
                                this.token = true;
                        }
                        if (localStorage.role_id == 1) {
                                this.role_id = false;
                                console.log(this.role_id);
                        }
                        else{
                                this.role_id = true;
                        }
                },
                watch: {
                        hasCritic: function(){
                                return this.textButton = "Modifier"
                        }
                }
        }
</script>
