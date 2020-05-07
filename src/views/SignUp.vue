<template>
    <div id="inscriptionPage">
        <h2>Page Inscription</h2>
        <form>
            <table id="sectionFormulaireInscription">
                <tr>
                    <td><label for="userName">Name d'utilisateur: </label></td>
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
                    <td>
                        <label for="firstName">Nom: </label>
                    </td>
                    <td>
                        <input id="firstName" v-model="firstName" type="text" name="firstName">
                    </td>
                </tr>
                    <tr>
                    <td>
                        <label for="lastName"> Prénom: </label>
                    </td>
                    <td>
                        <input id="lastName" v-model="lastName" type="text" name="lastName">
                    </td>
                </tr>
                <tr>
                    <td><button id="lien" @click="onSelect()">Inscription</button></td>
                    <td><button class="modifButton" id="lien" @click="onSelect()">Modification</button></td>
                </tr>
            </table>
        </form>
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style lang="scss" scoped>

</style>