// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import VueResource from 'vue-resource'

Vue.use(VueResource);
Vue.use(BootstrapVue);
Vue.config.productionTip = false;

Vue.mixin({
  created: function () {
    this.hello()
  },
  data: function () {
    return {
      api_url: process.env.BACKEND_API_URL,
      idleMessage: 'Bienvenue.',
      click: 0
    }
  },
  methods: {
    hello () {
      console.log('hello from mixin!')
      /*
      this.$http.get('https://www.google.fr/').then(response => {
        console.log(response);
      }, response => {
        console.log(response);
      });
      */
    },
    countClick () {
      this.click++;
      console.log(this.click)
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
