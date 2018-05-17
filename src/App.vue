<template>
  <div id="app" class="component">
    <b-container fluid class="header status">{{ idleMessage }}</b-container>
    <b-container>
      <router-view/>
    </b-container>
    <webcam style="visibility:hidden" ref="webcam"></webcam>
    <img :src="this.img"/>
  </div>
</template>

<script>
import Vue from 'vue'
import IdleVue from 'idle-vue'
import Webcam from 'vue-web-cam/src/webcam'
import axios from 'axios'
import recorder from './recorder/main.js';

const eventsHub = new Vue();
const idleOptions = {
  eventEmitter: eventsHub,
  idleTime: process.env.IDLE_TIME
};

Vue.use(IdleVue, idleOptions);

export default {
  name: 'App',
  components: { Webcam },
  data: function () {
    return {
      idleMessage: 'Message par défaut.',
      img: null
    }
  },
  methods: {
    takePhoto () {
      this.img = this.$refs.webcam.capture();
    },
    sendPhoto () {
      this.takePhoto();
      console.log('photo envoyée');
      const data = new FormData();
      console.log(this.img);
      data.append('file', this.img);
      axios.post(this.api_url + 'fichier/video', data, {
          headers: {
            'Content-Type': "multipart/form-data"
          },
          params: {
            idPc: 420
          }
        })
        .then(response => {
          console.log(response);
        })
        .catch(e => {
          console.log(e)
        })
      setTimeout(this.sendPhoto, process.env.PHOTO_TIME);
    },
    recordAudio () {
      setTimeout(function(){
        recorder.toggleRecording
      }, 2000);

      // console.log(recorder);
    }
  },
  mounted: function () {
    this.sendPhoto();
    this.recordAudio();
  },
  // Idle hooks
  onIdle () {
    console.log('idle');
    this.idleMessage = "L'utilisateur semble inactif.";
    /*
    axios.get(this.api_url + 'aide', {
      params: {
        idPc: 420,
        motif: "L'utilisateur semble inactif."
      },
    })
      .then((response) => {
        return;
      })
      .catch((e) => {
        console.log(e)
      })
      */
  },
  onActive () {
    console.log('active');
    this.idleMessage = 'Utilisateur de nouveau actif';
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
