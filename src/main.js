// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import VueResource from 'vue-resource'

Vue.use(VueResource);
Vue.use(BootstrapVue);
Vue.config.productionTip = false;

Vue.mixin({
  data: function () {
    return {
      api_url: process.env.BACKEND_API_URL,
      id_pc: process.env.ID_PC,
      idleMessage: 'Bienvenue.',
      click: 0
    }
  },
  methods: {
    countClick () {
      this.click++;
      if (this.click > 40) {
        axios.get(this.api_url + 'aide', {
          params: {
            idPc: this.id_pc,
            motif: "L'utilisateur semble être en difficulté devant le formulaire."
          },
        })
          .then((response) => {
            return;
          })
          .catch((e) => {
            console.log(e)
          })
      }
    }
  }
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
