<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>Pages :</h2>
    <p><a href="#/inscription">Formulaire</a></p>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      msg: "Bienvenue sur l'application de démonstration"
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
