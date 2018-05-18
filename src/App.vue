<template>
  <div id="app" class="component">
    <b-container fluid class="header status fixed-top">{{ idleMessage }}</b-container>
    <b-container class="main">
      <router-view/>
    </b-container>
    <record></record>
    <b-col>
      <p>Dernier snapshot envoyé : </p>
      <img style="border: 1px solid black;" :src="this.img"/>
    </b-col>
    <webcam style="visibility:hidden" ref="webcam"></webcam>
  </div>
</template>

<script>
import Vue from 'vue'
import IdleVue from 'idle-vue'
import Webcam from 'vue-web-cam/src/webcam'
import axios from 'axios'
import Record from '@/components/Record'

const eventsHub = new Vue();
const idleOptions = {
  eventEmitter: eventsHub,
  idleTime: process.env.IDLE_TIME
};

Vue.use(IdleVue, idleOptions);

export default {
  name: 'App',
  components: { Webcam, Record },
  data: function () {
    return {
      img: null
    }
  },
  methods: {
    takePhoto () {
      this.img = this.$refs.webcam.capture();
    },
    sendPhoto () {
      this.takePhoto();

      const data = new FormData();

      var base64 = this.img;
      console.log(base64);
      base64 = base64.substring(base64.indexOf(',') + 1);
      console.log(base64);
      data.append('file', base64);
      var that = this;
      axios.post(this.api_url + 'fichier/video', data, {
          headers: {
            'Content-Type': "application/x-www-form-urlencoded"
          },
          params: {
            idPc: that.id_pc
          }
        })
        .then(response => {
          console.log(response);
          that.idleMessage = ' Photo envoyée.';
        })
        .catch(e => {
          console.log(e)
        })
      console.log('photo envoyée');
      setTimeout(this.sendPhoto, process.env.PHOTO_TIME);
    }
  },
  mounted () {
    this.sendPhoto();
  },
  // Idle hooks
  onIdle () {
    console.log('idle');
    this.idleMessage = "L'utilisateur semble inactif.";
    axios.get(this.api_url + 'aide', {
      params: {
        idPc: this.id_pc,
        motif: "L'utilisateur semble inactif."
      },
    })
      .then((response) => {
        return;
      })
      .catch((e) => {
        console.log(e)
      })
  },
  onActive () {
    console.log('active');
    this.idleMessage = 'Utilisateur actif.';
  }
}
</script>

<style>
@import '/assets/css/style.css';
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
