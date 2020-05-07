<template>
  <div id="app">
    <h1>Bienvenue à VideoLy</h1>
    <nav>
      <router-link to="">Se connecter</router-link>
      <router-link to="">S'inscrire</router-link>
    </nav>
    <router-view/>
    <footer>
      <p>Fait par Paul Lenoir et Vincent Leduc</p>
    </footer>
  </div>

</template>

<script>
  export default {
    name: "App",
  }

</script>

<style>
  body,html{
    height:auto;
    width:100%;
  }

  body{
    margin-top:0;
    margin-left:0;
    overflow-y: scroll;
    background-color: #031634;
  }
  
  #app {
    text-align: center;
    color:white;
    height:100%;
    width:100%;
    
  }

  h1{
    font-size: 45px;
    margin : 0;
    padding-top: 2%;
    color: #E8DDCB;
    font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
  }
</style>
