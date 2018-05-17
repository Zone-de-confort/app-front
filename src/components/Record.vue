<template>
  <div class="record">
    <button class="button red-button" v-on:click.stop.prevent="toggleRecording">
      <i class="stop icon" v-show="isRecording"></i>
      <i class="record icon" v-show="!isRecording"></i>
      <span v-show="!isRecording">Start recording</span>
      <span v-show="isRecording">Stop recording</span>
    </button>
    <button class="button green-button" v-if="dataUrl.length > 0" v-on:click.stop.prevent="togglePlay">
      <i class="play icon"></i> Play recording
    </button>
    <button class="remove-recording">
      <i class="remove icon"></i> Delete recording
    </button>
    <button class="button green-button">
      <i class="send icon"></i> Send recording
    </button>
    <audio id="audio" preload="auto"></audio>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      isRecording: false,
      audioRecorder: null,
      recordingData: [],
      dataUrl: ''
    };
  },
  methods: {
    toggleRecording: function () {
      var that = this;
      this.isRecording = !this.isRecording;
      if (this.isRecording) {
        navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
        navigator.getUserMedia({
          audio: true,
          video: false
        }, function (stream) {
          that.stream = stream;
          that.audioRecorder = new MediaRecorder(stream, {
            mimeType: 'audio/ogg',
            audioBitsPerSecond: 96000
          });
          that.audioRecorder.start();
          console.log('Media recorder started');
        }, function (error) {
          alert(JSON.stringify(error));
        });
      } else {
        this.audioRecorder.stop();

        this.audioRecorder.ondataavailable = function (event) {
          that.recordingData.push(event.data);
        }
        this.audioRecorder.onstop = function (event) {
          console.log('Media recorder stopped');
          var blob = new Blob(that.recordingData, {type: 'audio/ogg'});
          that.dataUrl = window.URL.createObjectURL(blob);
        }
      }
    },
    removeRecording: function () {
    },
    togglePlay: function () {
      console.log('togglePlay()');
      var audioElement = document.getElementById('audio');
      if (audioElement.paused === false) {
        audioElement.pause();
      } else {
        console.log('playing');
        audioElement.play();
      }
    },
    submitRecording: function () {
    }
  }
};
</script>

<style scoped>

</style>
