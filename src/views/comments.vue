<template>
    <div>
        <p>Commentaire: {{this.critic.comment}}</p> 
        <p>Nom du membre: {{userName}}</p>
        <p>Date: {{date}}</p>
        <hr>
    </div>
</template>

<script>
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
                user_id:"",
                date: "",
            }
        },
        created(){
            console.log(localStorage.token);
            this.user_id = this.critic.user_id;
            this.date = this.critic.creation_date.substr(0,10)
            this.userName = this.critic.critic_first_name + ' ' + this.critic.critic_last_name

        }
    }
</script>
