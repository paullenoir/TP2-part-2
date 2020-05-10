<template>
    <div>
        <h2>Se connecter</h2>
        <div id="connectionSection">
            <div class="form-group" :class="{ 'form-group--error': $v.name.$error }">
                <label class="form__label">Nom d'utilisateur: </label>
                <input class="form__input" v-model.trim="$v.name.$model"/>
                <div class="error" v-if="!$v.name.required">Le champs est requis</div>
                <div class="error" v-if="!$v.name.minLength">Nom d'utilisateur doit avoir plus de {{$v.name.$params.minLength.min}} lettres.</div>
                <div class="error" v-if="!$v.name.maxLength">Nom d'utilisateur doit avoir moins de {{$v.name.$params.maxLength.max}} lettres.</div>
            </div>
            

            <div class="form-group" :class="{ 'form-group--error': $v.password.$error }">
                <label class="form__label">Mot de passe: </label>
                <input class="form__input" v-model.trim="$v.password.$model"/>
            </div>
            <div class="error" v-if="!$v.password.required">Le champs est requis</div>
            <div class="error" v-if="!$v.password.maxLength">Nom mot de passe doit avoir moins de {{$v.password.$params.maxLength.max}} lettres.</div>

            <button id="lien" class="button" type="submit" :disabled="submitStatus === 'PENDING'">Se connecter</button>
            <p class="typo__p" v-if="submitStatus === 'OK'">Vous êtes connecté</p>
            <p class="typo__p" v-if="submitStatus === 'ERROR'">Slp, remplir le champs correctement</p>
            <p class="typo__p" v-if="submitStatus === 'PENDING'">Envoi...</p>
        </div>
    </div>
</template>

<script>
    import { required, minLength, maxLength} from 'vuelidate/lib/validators'
    import ApiServices from '../services/ApiServices.js';

    export default {
        data() {
            return {
                name: '',
                password:"",
                submitStatus: null,
                token:""
            }
        },
        validations: {
            name: {
                required,
                minLength: minLength(4),
                maxLength: maxLength(50)
            },
            password: {
                required,
                maxLength: maxLength(50)
            }
        },
        submit() {
            ApiServices.getUsersLogin()
                .then(response => {
                    this.token = response.data;
                })
            this.$v.$touch()
            if (this.$v.$invalid) {
                this.submitStatus = 'ERROR'
            } 
            else {
                // do your submit logic here
                this.submitStatus = 'PENDING'
                setTimeout(() => {
                this.submitStatus = 'OK'
                }, 500)
            }
        }
    }
</script>