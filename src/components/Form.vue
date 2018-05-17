<template>
  <b-row>
    <b-col>
      <b-form @submit="onSubmit" @reset="onReset" v-if="show">
        <b-form-group id="emailGroup"
                      label="Votre adresse mail:"
                      label-for="email">
          <b-form-input id="email"
                        type="email"
                        v-model="form.email"
                        required
                        placeholder="Entrer ici votre email">
          </b-form-input>
        </b-form-group>
        <b-form-group id="nomGroup"
                      label="Votre nom:"
                      label-for="nom">
          <b-form-input id="nom"
                        type="text"
                        v-model="form.nom"
                        required
                        placeholder="Entrer ici votre nom">
          </b-form-input>
        </b-form-group>
        <b-form-group id="prenomGroup"
                      label="Votre prénom:"
                      label-for="prenom">
          <b-form-input id="prenom"
                        type="text"
                        v-model="form.prenom"
                        required
                        placeholder="Entrer ici votre prénom">
          </b-form-input>
        </b-form-group>
        <b-button type="submit" variant="primary">Envoyer</b-button>
        <b-button @click="countClick()" type="reset" variant="danger">Réinitialiser</b-button>
      </b-form>
    </b-col>
  </b-row>
</template>

<script>
export default {
  data () {
    return {
      form: {
        email: '',
        nom: '',
        prenom: ''
      },
      show: true
    }
  },
  methods: {
    onSubmit (evt) {
      evt.preventDefault();
      alert(JSON.stringify(this.form));
    },
    onReset (evt) {
      evt.preventDefault();
      this.form.email = '';
      this.form.nom = '';
      this.form.prenom = '';
      /* Trick to reset/clear native browser form validation state */
      this.show = false;
      this.$nextTick(() => { this.show = true });
    }
  },
  mounted () {
    this.click = 0;
  }
}
</script>
