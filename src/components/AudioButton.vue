<template>
  <div class="audioButton">
    <button v-if="!playState" @click="onPlay()">Play</button>
    <button v-else  @click="onPause()">Pause</button>
  </div>
</template>

<script>
import SoundReactor from "../classes/SoundReactorClass";

export default {
  name: "AudioButton",
  data() {
    return {
      initState: false,
      playState: false
    }
  },
  methods: {
    onPlay() {
      if(!this.initState) {
        SoundReactor.init();
        this.initState = true;
      }

      SoundReactor.play();
      this.playState = true;
    },
    onPause() {
      SoundReactor.pause();
      this.playState = false;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
.audioButton {
  position: fixed;
  bottom: 25%;
  right: 10%;
  z-index: 1;

  button {
    display: block;
    font-size 1.25rem;
    line-height: 1;
    font-weight bold;
    color: #fff;
    padding: .5em 1em;
    background rgba(255, 255, 255, 0);
    border: 2px solid #fff;
    border-radius: 3.25rem;
    cursor pointer;
    transition:
        color .2s ease,
        background-color .2s ease;

    &:hover {
      background: #fff;
      color: #151515;
    }
  }
}
</style>
