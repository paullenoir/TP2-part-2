<template>
    <div id="inscriptionPage">
        <h2>Page Inscription</h2>
        <div id="inscriptionSection">
            <div class="form-group" :class="{ 'form-group--error': $v.userName.$error }">
                <label class="form__label">Nom d'utilisateur: </label>
                <input class="form__input" v-model.trim="$v.userName.$model"/>
                <div class="error" v-if="!$v.userName.required">Le champs est requis</div>
                <div class="error" v-if="!$v.userName.minLength">Nom d'utilisateur doit avoir plus de {{$v.userName.$params.minLength.min}} lettres.</div>
                <div class="error" v-if="!$v.userName.maxLength">Nom d'utilisateur doit avoir moins de {{$v.userName.$params.maxLength.max}} lettres.</div>
                
            </div>
            
            <div class="form-group" :class="{ 'form-group--error': $v.password.$error }">
                <label class="form__label">Mot de passe: </label>
                <input class="form__input" v-model.trim="$v.password.$model"/>
            </div>
            <div class="error" v-if="!$v.password.required">Le champs est requis</div>
            <div class="error" v-if="!$v.password.maxLength">Nom mot de passe doit avoir moins de {{$v.password.$params.maxLength.max}} lettres.</div>

            <div class="form-group" :class="{ 'form-group--error': $v.passwordConfirm.$error }">
                <label class="form__label">Mot de passe: </label>
                <input class="form__input" v-model.trim="$v.passwordConfirm.$model"/>
            </div>
            <div class="error" v-if="!$v.passwordConfirm.required">Le champs est requis</div>
            <div class="error" v-if="!$v.passwordConfirm.maxLength">Le mot de passe doit avoir moins de {{$v.passwordConfirm.$params.maxLength.max}} lettres.</div>

            <div class="form-group" :class="{ 'form-group--error': $v.email.$error }">
                <label class="form__label">Courriel: </label>
                <input class="form__input" v-model.trim="$v.email.$model"/>
            </div>
            <div class="error" v-if="!$v.email.required">Le champs est requis.</div>
            <div class="error" v-if="!$v.email.email">Ceci n'est pas un mail valide.</div>

            <div class="form-group" :class="{ 'form-group--error': $v.firstName.$error }">
                <label class="form__label">Nom:</label>
                <input class="form__input" v-model.trim="$v.firstName.$model"/>
            </div>
            <div class="error" v-if="!$v.firstName.required">Le champs est requis.</div>
            <div class="error" v-if="!$v.firstName.maxLength">Le nom doit avoir moins de {{$v.firstName.$params.maxLength.max}} lettres.</div>

            <div class="form-group" :class="{ 'form-group--error': $v.lastName.$error }">
                <label class="form__label">Prénom:</label>
                <input class="form__input" v-model.trim="$v.lastName.$model"/>
            </div>
            <div class="error" v-if="!$v.lastName.required">Le champs est requis.</div>
            <div class="error" v-if="!$v.lastName.maxLength">Le prénom doit avoir moins de {{$v.lastName.$params.maxLength.max}} lettres.</div>

            <button id="lien" class="button" type="submit" :disabled="submitStatus === 'PENDING'">S'inscrire</button>
            <p class="typo__p" v-if="submitStatus === 'OK'">Vous êtes inscrit</p>
            <p class="typo__p" v-if="submitStatus === 'ERROR'">Slp, remplir le champs correctement</p>
            <p class="typo__p" v-if="submitStatus === 'PENDING'">Envoi...</p>
        </div>
    </div>
</template>

<script>
    import {required, minLength, maxLength, email} from 'vuelidate/lib/validators'
    export default {
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
                required,
                maxLength: maxLength(50)
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
        }
    }
</script>