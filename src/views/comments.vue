<template>
    <div>
        <p>Commentaire: {{this.critic.comment}}</p> 
        <p>Nom du membre: {{this.critic.user_id}}</p> 
        <p>Date: {{this.critic.id}}</p> 
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
    }
</script>
