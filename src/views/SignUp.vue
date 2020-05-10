<template>
    <div id="inscriptionPage">
        <h2>Page Inscription</h2>
        <div id="inscriptionSection">
            <div class="form-group" :class="{ 'form-group--error': $v.userName.$error }">
                <label class="form__label">Nom d'utilisateur: </label>
                <input class="form__input" v-model="userName" v-model.trim="$v.userName.$model"/>
            </div>
            <div class="error" v-if="!$v.userName.required">Le champs est requis</div>
            <div class="error" v-if="!$v.userName.minLength">Nom d'utilisateur doit avoir plus de {{$v.userName.$params.minLength.min}} lettres.</div>
            <div class="error" v-if="!$v.userName.maxLength">Nom d'utilisateur doit avoir moins de {{$v.userName.$params.maxLength.max}} lettres.</div>
                
            
            <div class="form-group" :class="{ 'form-group--error': $v.password.$error }">
                <label class="form__label">Mot de passe: </label>
                <input class="form__input" v-model="password" v-model.trim="$v.password.$model"/>
            </div>
            <div class="error" v-if="!$v.password.required">Le champs est requis</div>
            <div class="error" v-if="!$v.password.maxLength">Nom mot de passe doit avoir moins de {{$v.password.$params.maxLength.max}} lettres.</div>

            <div class="form-group" :class="{ 'form-group--error': $v.passwordConfirm.$error }">
                <label class="form__label">Mot de passe confirmation: </label>
                <input class="form__input" v-model="passwordConfirm" v-model.trim="$v.passwordConfirm.$model"/>
            </div>
            <div class="error" v-if="!$v.passwordConfirm.sameAsPassword">Le mot de passe doit etre identique.</div>

            <div class="form-group" :class="{ 'form-group--error': $v.email.$error }">
                <label class="form__label">Courriel: </label>
                <input class="form__input" v-model="email" v-model.trim="$v.email.$model"/>
            </div>
            <div class="error" v-if="!$v.email.required">Le champs est requis.</div>
            <div class="error" v-if="!$v.email.email">Ceci n'est pas un mail valide.</div>

            <div class="form-group" :class="{ 'form-group--error': $v.firstName.$error }">
                <label class="form__label">Nom:</label>
                <input class="form__input" v-model="firstName" v-model.trim="$v.firstName.$model"/>
            </div>
            <div class="error" v-if="!$v.firstName.required">Le champs est requis.</div>
            <div class="error" v-if="!$v.firstName.maxLength">Le nom doit avoir moins de {{$v.firstName.$params.maxLength.max}} lettres.</div>

            <div class="form-group" :class="{ 'form-group--error': $v.lastName.$error }">
                <label class="form__label">Prénom:</label>
                <input class="form__input" v-model="lastName" v-model.trim="$v.lastName.$model"/>
            </div>
            <div class="error" v-if="!$v.lastName.required">Le champs est requis.</div>
            <div class="error" v-if="!$v.lastName.maxLength">Le prénom doit avoir moins de {{$v.lastName.$params.maxLength.max}} lettres.</div>

            <button id="lien" class="button" type="submit"  @click="signup()">S'inscrire</button>
            <p class="typo__p" v-if="submitStatus === 'OK'">Vous êtes inscrit</p>
            <p class="typo__p" v-if="submitStatus === 'ERROR'">Slp, remplir le champs correctement</p>
        </div>
    </div>
</template>

<script>
    import {required, minLength, maxLength, email, sameAs} from 'vuelidate/lib/validators'
    import axios from 'axios'

    export default {
        data() {
            return {
                userName:"",
                password:"",
                passwordConfirm:"",
                email:"",
                firstName:"",
                lastName:"",
                role_id: 2,
                submitStatus: null
            }
        },
        validations: {
            userName: {
                required,
                minLength: minLength(3),
                maxLength: maxLength(50)
            },
            password: {
                required,
                maxLength: maxLength(50)
            },
            passwordConfirm: {
                sameAsPassword: sameAs('password')
            },
            email:{
                required,
                email
            },
            firstName:{
                required,
                maxLength: maxLength(50)
            },
            lastName:{
                required,
                maxLength: maxLength(50)
            }
        },
        methods:{
            signup(){
                var mesDonnees = new FormData();
                mesDonnees.append("login",this.userName);
                mesDonnees.append("password",this.password);
                mesDonnees.append("email",this.email);
                mesDonnees.append("last_name",this.lastName);
                mesDonnees.append("first_name",this.firstName);
                mesDonnees.append("role_id",this.role_id);
                axios({method: "post",url:'http://radiant-plains-67953.herokuapp.com/api/users',
                    data : mesDonnees
                    })
                    .then(
                        this.submitStatus = "OK",
                        console.log(this.submitStatus)
                        )
                    .catch(
                        error =>{
                            console.log('erreur de data : ', error.response),
                            this.submitStatus = "ERROR",
                            console.log(this.submitStatus)
                        }
                    );
            }
        },
        mounted() {
            if (localStorage.userName) {
                this.userName = localStorage.userName;
            }
            if (localStorage.password) {
                this.password = localStorage.password;
            }
            if (localStorage.passwordConfirm) {
                this.passwordConfirm = localStorage.passwordConfirm;
            }
            if (localStorage.email) {
                this.email = localStorage.email;
            }
            if (localStorage.firstName) {
                this.firstName = localStorage.firstName;
            }
            if (localStorage.lastName) {
                this.lastName = localStorage.lastName;
            }
        },
        watch: {
            userName(newName) {
                localStorage.userName = newName;
            },
            password(newPassword) {
                localStorage.password = newPassword;
            },
            passwordConfirm(newPasswordConfirm) {
                localStorage.passwordConfirm = newPasswordConfirm;
            },
            email(newEmail) {
                localStorage.email = newEmail;
            },
            firstName(newFirstName) {
                localStorage.firstName = newFirstName;
            },
            lastName(newLastName) {
                localStorage.lastName = newLastName;
            }
        }
    }
</script>