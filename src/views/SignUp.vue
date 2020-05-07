<template>
    <div id="inscriptionPage">
        <h2>Page Inscription</h2>
        <form id="app" @submit="onSubmit" action="/something" method="post">
          <p v-if="errors.length">
            <b>Veuillez corriger ces erreur(s):</b>
            <ul>
                <li v-for="error in errors" :key="error.id">{{ error }}</li>
            </ul>
        </p>
            <table id="sectionFormulaireInscription">
                <tr>
                    <td><label for="userName">Nom d'utilisateur: </label></td>
                    <td><input id="userName" v-model="userName" type="text" name="userName"></td>
                </tr>
                <tr>
                    <td><label for="password">Mot de passe: </label></td>
                    <td><input id="password" v-model="password" type="text" name="password"></td>
                </tr>
                <tr>
                    <td><label for="passwordConfirmed">Confirmation mot de passe: </label></td>
                    <td><input id="passwordConfirmed" v-model="passwordConfirmed" type="text" name="passwordConfirmed"></td>
                </tr>
                <tr>
                    <td><label for="mail">Courriel: </label></td>
                    <td><input id="mail" v-model="mail" type="text" name="mail"></td>
                </tr>
                <tr>
                    <td><label for="firstName">Nom: </label></td>
                    <td><input id="firstName" v-model="firstName" type="text" name="firstName"></td>
                </tr>
                <tr>
                    <td><label for="lastName"> Prénom: </label></td>
                    <td><input id="lastName" v-model="lastName" type="text" name="lastName"></td>
                </tr>
                <tr>
                    <td colspan="2"><input id="lien" type="submit" value="Inscription"> </td>
                </tr>
            </table>
        </form>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                errors: [],
                userName: null,
                password: null,
                passwordConfirmed: null,
                mail: null,
                firstName: null,
                lastName: null,
            }
        },
        methods:{
            onSubmit: function (e) {
                if (this.userName && this.password && this.passwordConfirmed && this.mail && this.firstName && this.lastName) {
                    return true;
                }

                this.errors = [];

                if (!this.userName) {
                    this.errors.push('Nom d\'utilisateur manquant.');
                }
                if (!this.password) {
                    this.errors.push('Mot de passe manquant.');
                }
                if (!this.passwordConfirmed) {
                    this.errors.push('Confirmation mot de passe manquant.');
                }
                if (!this.mail) {
                    this.errors.push('Courriel manquant.');
                }
                if (!this.firstName) {
                    this.errors.push('Nom manquant.');
                }
                if (!this.lastName) {
                    this.errors.push('Prénom manquant.');
                }

                e.preventDefault();
            }
        }
    }
</script>