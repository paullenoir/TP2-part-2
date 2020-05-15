<template>
    <div>
        <h2>Modification du Film</h2>
        <div id="filmForm">
            <div class="form-group" :class="{ 'form-group--error': $v.titleFilm.$error }">
                <label class="form__label">Titre: </label>
                <input class="form__input" v-model="titleFilm" v-model.trim="$v.titleFilm.$model"/>
            </div>
            <div class="error" v-if="!$v.titleFilm.required">Le champs est requis</div>
            <div class="error" v-if="!$v.titleFilm.minLength">Le titre doit avoir plus de {{$v.titleFilm.$params.minLength.min}} lettres.</div>
            <div class="error" v-if="!$v.titleFilm.maxLength">Le titre doit avoir moins de {{$v.titleFilm.$params.maxLength.max}} lettres.</div>
                
            
            <div class="form-group" :class="{ 'form-group--error': $v.releaseFilm.$error }">
                <label class="form__label">Année: </label>
                <input class="form__input" v-model="releaseFilm" v-model.trim="$v.releaseFilm.$model"/>
            </div>
            <div class="error" v-if="!$v.releaseFilm.required">Le champs est requis</div>
            <div class="error" v-if="!$v.releaseFilm.maxLength">L'année doit avoir moins de {{$v.releaseFilm.$params.maxLength.max}} lettres.</div>

            <div class="form-group" :class="{ 'form-group--error': $v.lengthFilm.$error }">
                <label class="form__label">Durée: </label>
                <input class="form__input" v-model="lengthFilm" v-model.trim="$v.lengthFilm.$model"/>
            </div>
            <div class="error" v-if="!$v.lengthFilm.required">La Durée est requise.</div>
            <div class="error" v-if="!$v.lengthFilm.numeric">La durée est un nombre.</div>
            <div class="error" v-if="!$v.lengthFilm.maxLength">La Durée doit avoir moins de {{$v.lengthFilm.$params.maxLength.max}} chiffres.</div>

            <div class="form-group" :class="{ 'form-group--error': $v.descriptionFilm.$error }">
                <label class="form__label">Description: </label>
                <input class="form__input" v-model="descriptionFilm" v-model.trim="$v.descriptionFilm.$model"/>
            </div>
            <div class="error" v-if="!$v.descriptionFilm.required">La description est requise.</div>

            <div class="form-group" :class="{ 'form-group--error': $v.ratingFilm.$error }">
                <label class="form__label">Classement:</label>
                <input class="form__input" v-model="ratingFilm" v-model.trim="$v.ratingFilm.$model"/>
            </div>
            <div class="error" v-if="!$v.ratingFilm.required">Le champs est requis.</div>

            <div class="form-group" :class="{ 'form-group--error': $v.languageFilm.$error }">
                <label class="form__label">langue_id:</label>
                <input class="form__input" v-model="languageFilm" v-model.trim="$v.languageFilm.$model"/>
            </div>
            <div class="error" v-if="!$v.languageFilm.required">Le champs est requis.</div>
            <div class="error" v-if="!$v.languageFilm.maxLength">langue_id doit avoir moins de {{$v.languageFilm.$params.maxLength.max}} lettres.</div>
            <div class="error" v-if="!$v.languageFilm.numeric">langue_id est un nombre.</div>

            <div class="form-group" :class="{ 'form-group--error': $v.featuresFilm.$error }">
                <label class="form__label">Feature:</label>
                <input class="form__input" v-model="featuresFilm" v-model.trim="$v.featuresFilm.$model"/>
            </div>
            <div class="error" v-if="!$v.featuresFilm.maxLength">Feature doit avoir moins de {{$v.featuresFilm.$params.maxLength.max}} lettres.</div>

            <div class="form-group" :class="{ 'form-group--error': $v.imageFilm.$error }">
                <label class="form__label">Image:</label>
                <input class="form__input" v-model="imageFilm" v-model.trim="$v.imageFilm.$model"/>
            </div>
            <div class="error" v-if="!$v.imageFilm.maxLength">Image doit avoir moins de {{$v.imageFilm.$params.maxLength.max}} lettres.</div>
           

            <button id="lien" class="button" type="submit"  @click="getAjouter()">Ajouter</button>
            <p class="typo__p" v-if="ajouterStatus === 'OK'">Ajouter ok</p>
            <p class="typo__p" v-if="ajouterStatus === 'ERROR'">erreur Ajouter</p>

            <button id="lien" class="button" type="submit"  @click="getModification()" style="margin-left:10px;">Modification</button>
            <p class="typo__p" v-if="ModificationStatus === 'OK'">Modification ok</p>
            <p class="typo__p" v-if="ModificationStatus === 'ERROR'">erreur modification</p>

            <button id="lien" class="button" type="submit"  @click="getSuppression()" style="margin-left:10px;">Suppression</button>
            <p class="typo__p" v-if="SuppressionStatus === 'OK'">Suppression ok</p>
            <p class="typo__p" v-if="SuppressionStatus === 'ERROR'">erreur suppression</p>
        </div>
    </div>
</template>

<script>
    import {required,minLength, maxLength, numeric} from 'vuelidate/lib/validators'
    import axios from 'axios' 

    export default {
        data(){
            return{
                titleFilm: "",
                releaseFilm:"",
                lengthFilm: 0,
                descriptionFilm: "",
                ratingFilm: "",
                languageFilm: 0,
                featuresFilm:"",
                imageFilm:"",
                ModificationStatus: "",
                SuppressionStatus: "",
                ajouterStatus: "",
                filmId:""
            }
        },
        validations: {
            titleFilm: {
                required,
                minLength: minLength(1),
                maxLength: maxLength(50)
            },
            releaseFilm: {
                required,
                maxLength: maxLength(4)
            },
            lengthFilm: {
                required,
                numeric,
                maxLength: maxLength(3)
            },
            descriptionFilm: {
                required
            },
            ratingFilm: {
                required
            },
            languageFilm: {
                required,
                maxLength: maxLength(1),
                numeric
            },
            featuresFilm: {
                maxLength: maxLength(200)
            },
            imageFilm: {
                required,
                maxLength: maxLength(40)
            }
        },
        created(){
                this.titleFilm = this.$route.params.film.title
                this.releaseFilm = this.$route.params.film.release_year
                this.lengthFilm = this.$route.params.film.length
                this.descriptionFilm = this.$route.params.film.description
                this.ratingFilm = this.$route.params.film.rating
                this.languageFilm = this.$route.params.film.language_id
                this.featuresFilm = this.$route.params.film.special_features
                this.imageFilm = this.$route.params.film.image
                this.filmId = this.$route.params.film.id
        },
        methods:{
            getAjouter(){
                var mesDonnees = new FormData();
                mesDonnees.append("title",this.titleFilm);
                mesDonnees.append("release_year",this.releaseFilm);
                mesDonnees.append("length",this.lengthFilm);
                mesDonnees.append("description",this.descriptionFilm);
                mesDonnees.append("rating",this.ratingFilm);
                mesDonnees.append("language_id",this.languageFilm);
                mesDonnees.append("special_features",this.featuresFilm);
                mesDonnees.append("image",this.image);
                var token = localStorage.token
                axios({
                        method: "post",
                        url:'http://radiant-plains-67953.herokuapp.com/api/films',
                        data : mesDonnees,
                        header:{
                            Accept: 'application/json',
                            'Content-Type': 'application/json',
                            Authorization: "Bearer " + token
                        }
                    })
                    .then(
                        this.ajouterStatus = "OK",
                        console.log(this.ajouterStatus)
                        )
                    .catch(
                        error =>{
                            console.log('erreur de data : ', error.response),
                            this.ajouterStatus = "ERROR",
                            console.log(this.ajouterStatus)
                        }
                    );
            },
            getModification(){
                var mesDonnees = new FormData();
                mesDonnees.append("title",this.titleFilm);
                mesDonnees.append("release_year",this.releaseFilm);
                mesDonnees.append("length",this.lengthFilm);
                mesDonnees.append("description",this.descriptionFilm);
                mesDonnees.append("rating",this.ratingFilm);
                mesDonnees.append("language_id",this.languageFilm);
                mesDonnees.append("special_features",this.featuresFilm);
                mesDonnees.append("image",this.image);
                var token = localStorage.token
                axios({
                        method: "put",
                        url:'http://radiant-plains-67953.herokuapp.com/api/films/' + this.filmId,
                        data : mesDonnees,
                        header:{
                            Accept: 'application/json',
                            'Content-Type': 'application/json',
                            Authorization: "Bearer " + token
                        }
                    })
                    .then(
                        this.ModificationStatus = "OK",
                        console.log(this.ModificationStatus)
                        )
                    .catch(
                        error =>{
                            console.log('erreur de data : ', error.response),
                            this.ModificationStatus = "ERROR",
                            console.log(this.ModificationStatus)
                        }
                    );
            },
            getSuppression(){
                var token = localStorage.token
                let config = {
                        header:{
                            common:{
                                Accept: 'application/json',
                                'Content-Type': 'application/json',
                                Authorization: "Bearer " + token
                            }
                        }
                }
                axios({
                    method: "delete",
                    url:'http://radiant-plains-67953.herokuapp.com/api/films/' + this.filmId, 
                    config
                    })
                    .then(
                        this.SuppressionStatus = "OK",
                        console.log(this.SuppressionStatus)
                        )
                    .catch(
                        error =>{
                            console.log('erreur de data : ', error.response),
                            this.SuppressionStatus = "ERROR",
                            console.log(this.SuppressionStatus)
                        }
                    );
            }
        }
    }
</script>
