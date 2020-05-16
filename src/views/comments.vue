<template>
    <div>
        <p>Commentaire: {{this.critic.comment}}</p> 
        <p>Nom du membre: {{userName}}</p> 
        <hr>
    </div>
</template>

<script>
    import ApiServices from '../services/ApiServices.js';

    export default {
        props: {
            critic: {
                type: Object,
                default: null
            },
        },
        data(){
            return{
                userName: "",
                user_id:""
            }
        },
        created(){
            this.user_id = this.critic.user_id;
            ApiServices.getUserById(this.user_id)
                .then(response => {
                    this.userName = response.data;
                    console.log("reponse:" + response.data);
                })
                .catch(error =>{
                    console.log('erreur de data : ', error.response)
                })
        }
    }
</script>
