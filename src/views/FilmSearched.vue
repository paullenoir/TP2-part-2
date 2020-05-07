<template>
   <div id="filmSearch">
       <h3 @click="onSelect(film)" >Titre: {{film.title}}</h3>
       <img :src="film.image ? film.image : 'https://placeimg.com/200/200/tech'" width="150" @click="onSelect(film)"/>
       <p>Année de parution : {{film.release_year}}</p>
   </div>
</template>

<script>
    export default {
        props: {
            film: {
                type: Object,
                default: null
            },
        },
        methods:{
            onSelect(film){
                this.$router.push({ name: "filmDetails", params: { id: film.id } });
            },
        }
    }
</script>

<style lang="css">
    #filmSearch{
        width:80%;
        height:300px;
        margin-left: auto;
        margin-right: auto;
        border-top: 2px dashed red;
        padding-bottom: 10px;
        padding-top: 10px;
        text-align: center;
    }

    img{
        float:left;
        width:150px;
    }
</style>