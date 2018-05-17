<template></template>

<script>
import axios from 'axios'

export default {
  data: function () {
    return {
      isRecording: false,
      audioRecorder: null,
      recordingData: [],
      // dataUrl: '' // For testing purpose
    };
  },
  methods: {
    async record () {
      console.log('record')
      var that = this;
      navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
      navigator.getUserMedia({
        audio: true,
        video: false
      }, async function recording (stream) {
        that.stream = stream;
        that.audioRecorder = new MediaRecorder(stream, {
          mimeType: 'audio/ogg',
          audioBitsPerSecond: 96000
        });
        that.audioRecorder.start();
        console.log('Media recorder started');

        await that.sleep(process.env.AUDIO_TIME);
        that.stopAndSave();
        recording(stream);
      }, function (error) {
        alert("Enregistrement terminé, ou erreur: \n" + JSON.stringify(error));
      });
      console.log('end of record()')
    },
    async stopAndSave () {
      console.log('stopAndSave')
      var that = this;
      this.audioRecorder.stop();

      this.audioRecorder.ondataavailable = function (event) {
        that.recordingData = [];
        that.recordingData.push(event.data);
      }
      this.audioRecorder.onstop = function (event) {
        console.log('Media recorder stopped');
        var blob = new Blob(that.recordingData, {type: 'audio/ogg'});
        // that.dataUrl = window.URL.createObjectURL(blob); // For testing purpose
        var reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = function() {
          var base64 = reader.result;
          console.log("EL BASE64");
          console.log(base64);
          that.sendAudio(base64);
        }
      }
    },
    sendAudio (base64) {
      const data = new FormData();

      base64 = base64.substring(base64.indexOf(',') + 1);
      data.append('file', base64);

      axios.post(this.api_url + 'fichier/audio', data, {
        headers: {
          'Content-Type': "application/x-www-form-urlencoded"
        },
        params: {
          idPc: this.id_pc
        }
      })
        .then(response => {
          console.log(response);
          that.idleMessage = ' Audio envoyé.';
        })
        .catch(e => {
          console.log(e)
        })
    },
    sleep (ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }
  },
  mounted () {
    this.record();
  }
};
</script>

<style scoped>

</style>
