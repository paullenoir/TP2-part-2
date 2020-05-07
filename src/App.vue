<template>
  <div id="app">
    <h1>Bienvenue à VideoLy</h1>
    <nav>
      <router-link to="/signup"><span class="lienNav">S'inscrire</span></router-link>
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
          /* APP */
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

  h2{
    color:#E8DDCB;
  }

  nav{
    width:50%;
  }

  .lienNav{
    color: white;
    font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
    font-size: 25px;
    text-decoration:none;
    cursor: pointer;
  }

  .lienNav:hover{
    color: white;
    font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
    font-size: 35px;
    text-decoration:white;
    cursor: pointer;
  }

        /* SIGN UP */
  #inscriptionPage{
    background-color: rgb(3,101,100);
  }

  #sectionFormulaireInscription{
    width:50%;
    margin-left: 20%;
  }

  #sectionFormulaireInscription label{
    float: right;
    color: white;
    font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
    font-size: 18px;
  }

    #sectionFormulaireInscription input{
    float: left;
  }

  .modifButton{
    float: right;
  }


</style>
