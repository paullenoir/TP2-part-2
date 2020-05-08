<template>
    <div>
        <h2>Se connecter</h2>
        <div>
            <div class="form-group" :class="{ 'form-group--error': $v.name.$error }">
                <label class="form__label">Nom d'utilisateur: </label>
                <input class="form__input" v-model.trim="$v.name.$model"/>
            </div>
            <div class="error" v-if="!$v.name.required">Le champs est requis</div>
            <div class="error" v-if="!$v.name.minLength">Nom d'utilisateur doit avoir plus de {{$v.name.$params.minLength.min}} lettres.</div>
            <div class="error" v-if="!$v.name.maxLength">Nom d'utilisateur doit avoir moins de {{$v.name.$params.maxLength.max}} lettres.</div>
        </div>
    </div>
</template>

<script>
    import { required, minLength, maxLength} from 'vuelidate/lib/validators'

    export default {
        data() {
            return {
            name: ''
            }
        },
        validations: {
            name: {
            required,
            minLength: minLength(4),
            maxLength: maxLength(50)
            }
        }
    }
</script>