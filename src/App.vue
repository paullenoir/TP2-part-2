<template>
  <div id="app">
    <h1>Bienvenue à VideoLy</h1>
    <nav>
      <router-link to="/"><span class="lienNav">Accueil</span></router-link>
      <router-link to="/signup"><span class="lienNav">S'inscrire</span></router-link>
      <router-link to="/login"><span class="lienNav">Se connecter</span></router-link>
    </nav>
    <hr>
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
    width : 100%;
    padding-top: 30px;
    font-size: 35px;
    color: #E8DDCB;
  }

  h3{
    font-size: 25px;
    color: #E8DDCB;
    font-family: cursive;
  } 

  hr{
    width:75%;
    color: white;
  }

  p{
    font-size: 18px;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
  }


  nav{
    width:50%;
    text-decoration:none;
  }

  .lienNav{
    color: white;
    font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
    font-size: 25px;
    text-decoration:none;
    cursor: pointer;
    margin-left: 50px;
  }

  .lienNav:hover{
    color: white;
    font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
    font-size: 35px;
    text-decoration:white;
    cursor: pointer;
    text-decoration:none;
  }

  router-link{
    text-decoration:none;
  }
                                      /* ACCUEIL-INDEX */
  ul{
    background-color: #033649;
    width:80%;
    margin-left: auto;
    margin-right: auto;
    list-style:none;
  }

  ul h2{
    width : 100%;
    padding-top: 30px;
    font-size: 35px;
    color: #E8DDCB;
    font-family: cursive;
  }

  #searchBar{
    margin-top: 10px;
    height:30px;
    width: 10%;
    font-size: 17px;
    border: 1px solid grey;
    cursor: pointer;
    background: #f1f1f1;
    margin-left: 50%;
  }

  .beforeButton{
    background-color: darkorchid;
    border: none;
    color: white;
    padding: 12px 30px;
    text-align: center;
    text-decoration: none;
    font-size: 18px;
    float: left;
    margin-top: -50px;
  }

  .nextButton{
    background-color: darkorchid;
    border: none;
    color: white;
    padding: 12px 30px;
    text-align: center;
    text-decoration: none;
    font-size: 18px;
    float: right;
    margin-top: -50px;
  }
                                      /* FILM LIST */
  .active{
    visibility:hidden;
  }

  #filmSection{
    width:90%;
    margin-left: auto;
    margin-right: auto;
    border-top: 2px dashed red;
    padding-bottom: 10px;
    padding-top: 10px;
    text-align: center;
  }

  img{
    float:left;
    width:150px;
  }

  #champsText{
    text-align: center;
    margin: auto;
    padding-top: 10px;
    width:60%;
    background-color: rgb(3,101,100);
  }

  .underligne{
    text-decoration: underline;
  }

  router-link{
    color: white;
  }

  #lien{
    background-color: #f44336;
    border: none;
    color: white;
    padding: 12px 30px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 18px;
    justify-content: center;
  }

  #lien:hover{
    background-color: #008CBA;
  }

                                      /* FILM SEARCH */
  #filmSearch{
    width:80%;
    height:300px;
    margin-left: auto;
    margin-right: auto;
    border-top: 2px dashed red;
    padding-bottom: 10px;
    padding-top: 10px;
    text-align: center;
  }

                                      /* FILM DETAIL */
  #fullFilmSection{
    text-align: center;
    width:80%;
    height: auto;
    margin-left: auto;
    margin-right: auto;
    background-color: #033649;
  }


  .underligne{
    text-decoration: underline;
  }

  #lien{
    background-color: #f44336; 
    border: none;
    color: white;
    padding: 12px 30px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 18px;
    margin-top: 15px;
  }

                                      /* SIGN UP */ /* LOG IN */
  #inscriptionPage, #connectionSection, #inscriptionSection{
    background-color: rgb(3,101,100);
    padding: 15px;
    width:75%;
    margin-left: auto;
    margin-right: auto;
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

  #sectionFormulaireInscription #lien{
    margin-left: 50%;
    margin-right: 50%;
  }

                              /* LOG IN */
  #connectionSection label, #inscriptionSection label{
    color: white;
    font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
    font-size: 18px;
  }

  #connectionSection .error, #inscriptionSection .error{
    color:red;
    font-size: 16px;
    font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
  }
</style>
