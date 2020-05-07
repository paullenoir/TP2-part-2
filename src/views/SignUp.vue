<template>
    <div id="inscriptionPage">
        <h2>Page Inscription</h2>
        <form id="app" @submit="onSubmit" novalidate="true">
            <p v-if="errors.length">
                <b>Veuillez corriger ces erreur(s):</b>
                <ul>
                    <li v-for="error in errors" :key="error.id" style="color:red">{{ error }}</li>
                </ul>
            </p>
            <p v-if="inscription">
                Inscription réussie
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
    import axios from 'axios'

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
                inscription: false
            }
        },
        methods:{
            onSubmit: function (e) {
                if (this.userName && this.password && this.passwordConfirmed && this.mail && this.firstName && this.lastName) {
                    axios.post('http://radiant-plains-67953.herokuapp.com/api/users',{ body: this.data})
                    return true;
                }

                this.errors = [];

                if (!this.userName) {
                    this.errors.push('Nom d\'utilisateur manquant.');
                }
                if (this.userName.length < 3) {
                    this.errors.push('Nom d\'utilisateur trop court.');
                }
                if (this.userName.length > 50) {
                    this.errors.push('Nom d\'utilisateur trop long.');
                }
                if (!this.password) {
                    this.errors.push('Mot de passe manquant.');
                }
                if (this.password.length > 50) {
                    this.errors.push('Mot de passe trop long.');
                }
                if (!this.passwordConfirmed) {
                    this.errors.push('Confirmation mot de passe manquant.');
                }
                if (this.passwordConfirmed.length > 50) {
                    this.errors.push('Confirmation mot de passe trop long.');
                }
                if (!this.mail) {
                    this.errors.push('Courriel manquant.');
                } 
                else if (this.mail.length > 50) {
                    this.errors.push('Courriel trop long.');
                }
                else if (!this.validEmail(this.mail)) {
                    this.errors.push('Courriel non valide.');
                }
                if (!this.firstName) {
                    this.errors.push('Nom manquant.');
                }
                if (this.firstName.length > 50) {
                    this.errors.push('Nom trop long.');
                }
                if (!this.lastName) {
                    this.errors.push('Prénom manquant.');
                }
                if (this.lastName.length > 50) {
                    this.errors.push('Prénom trop long.');
                }

                e.preventDefault();
            },
            validEmail: function (email) {
                var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                return re.test(email);
            }
        }
    }
</script>