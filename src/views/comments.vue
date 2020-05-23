<template>
    <div>
        <p>Commentaire: {{this.critic.comment}}</p> 
        <p>Nom du membre: {{userName}}</p> 
        <hr>
    </div>
</template>

<script>
    import axios from 'axios'

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
            let URL = 'http://radiant-plains-67953.herokuapp.com/api/users/' + this.user_id
            let config = {'headers': { 
                                'Accept': 'application/json', 
                                'Content-Type': 'application/json',
                                'Authorization': 'Bearer ' + localStorage.token
                                } 
                        }
            axios.get(URL, config)
                    .then(response => {
                    console.log(response.data);
                    })
                    .catch(
                        error =>{
                            console.log(error);
                        }
                    );
        }
    }
</script>
