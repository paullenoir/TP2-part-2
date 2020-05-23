<template>
    <div>
        <h2>Se connecter</h2>
        <div id="connectionSection">
            <div class="form-group" :class="{ 'form-group--error': $v.userName.$error }">
                <label class="form__label">Nom d'utilisateur: </label>
                <input class="form__input" v-model="userName" v-model.trim="$v.userName.$model"/>
                <div class="error" v-if="!$v.userName.required">Le champs est requis</div>
                <div class="error" v-if="!$v.userName.minLength">Nom d'utilisateur doit avoir plus de {{$v.userName.$params.minLength.min}} lettres.</div>
                <div class="error" v-if="!$v.userName.maxLength">Nom d'utilisateur doit avoir moins de {{$v.userName.$params.maxLength.max}} lettres.</div>
            </div>
            

            <div class="form-group" :class="{ 'form-group--error': $v.password.$error }">
                <label class="form__label">Mot de passe: </label>
                <input class="form__input" v-model="password" v-model.trim="$v.password.$model"/>
            </div>
            <div class="error" v-if="!$v.password.required">Le champs est requis</div>
            <div class="error" v-if="!$v.password.maxLength">Nom mot de passe doit avoir moins de {{$v.password.$params.maxLength.max}} lettres.</div>

            <button id="lien" class="button" type="submit" @click="login()">Se connecter</button>
            <p class="typo__p" v-if="submitStatus === 'OK'">Vous êtes connecté</p>
            <p class="typo__p" v-if="submitStatus === 'ERROR'">Slp, remplir le champs correctement</p>
        </div>
    </div>
</template>

<script>
    import { required, minLength, maxLength} from 'vuelidate/lib/validators'
    import axios from 'axios'

    export default {
        data() {
            return {
                userName:"",
                password:"",
                submitStatus: null,
                token:"",
                role_id:0,
                prevRoute: null
            }
        },
        validations: {
            userName: {
                required,
                minLength: minLength(4),
                maxLength: maxLength(50)
            },
            password: {
                required,
                maxLength: maxLength(50)
            }
        },
        methods:{
            login() {
                var mesDonnees = new FormData();
                mesDonnees.append("login",this.userName);
                mesDonnees.append("password",this.password);
                axios({method: "post",url:'http://radiant-plains-67953.herokuapp.com/api/users/login',
                    data : mesDonnees
                    })
                    .then(response =>{this.token = response.data.token,
                                    this.role_id = response.data.role_id,
                                    this.submitStatus = "OK",
                                    localStorage.login = "true",
                                    localStorage.logout = "false",
                                    localStorage.role_id = this.role_id,
                                    localStorage.user_id = response.data.id,
                                    localStorage.userNameApp = this.userName,
                                    this.$router.go(-1)
                    })
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
        },
        watch: {
            userName(newName) {
                localStorage.userName = newName;
            },
            password(newPassword) {
                localStorage.password = newPassword;
            },
            token(newtoken) {
                localStorage.token = newtoken;
            },
            role_id(newRole_id) {
                localStorage.role_id = newRole_id;
            }

        }
    }
</script>