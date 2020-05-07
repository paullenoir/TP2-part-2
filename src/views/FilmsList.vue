<template>
    <div id="filmSection">
        <h3>Titre: {{film.title}}</h3>
        <img :src="film.image ? film.image : 'https://placeimg.com/200/200/tech'"/>
        <div id="champsText">
            <p><span class="underligne"> Cote moyenne:</span> {{cote}} <span :class="{active: coteIsNotActive}">sur 100</span> </p>
            <p><span class="underligne">Synopsis:</span> {{film.description.substring(0,100)}} ...</p>
            <p :class="{active: dureeIsNotActive}">Durée: {{film.length}} min</p>
        </div>
        <button id="lien" @click="onSelect(film)">Detail</button>
    </div>
</template>

<script>
    import ApiServices from '../services/ApiServices';

    export default {
        props: {
            film: {
                type: Object,
                default: null
            },
        },
        data(){
            return{
                filmAndCritic: {
                    type: Object,
                    default: null
                },
                countCritic: 0,
                cote: 0,
                dureeIsNotActive: true,
                coteIsNotActive: false,
            };
        },
        created(){
            ApiServices.getFilmWithId(this.film.id)
                .then(response => {
                    this.filmAndCritic = response.data;
                    if(this.filmAndCritic.critic.length >= 1){
                        this.getCote();
                    }
                    else{
                        this.cote = "non communiquée";
                        this.coteIsNotActive = true;
                    }
                })
                .catch(error =>{
                    console.log('erreur de data : ', error.response)
                })
        },
        methods:{
            getCote(){
                for(let i = 0; i < this.filmAndCritic.critic.length; i++){
                    this.countCritic = i + 1;
                    this.cote += parseInt(this.filmAndCritic.critic[i].score)
                }
                this.cote = this.cote / this.countCritic;
                return 0;
            },
            onSelect(film){
                this.$router.push({ name: "filmDetails", params: { id: film.id } });
            },
        },
    }
</script>
