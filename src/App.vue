<template>
  <LoadingScreen />
  <IntroScreen />
  <AudioButton />
  <ThreeScene />
</template>

<script>
import ThreeScene from "./components/ThreeScene.vue";
import AudioButton from "./components/AudioButton.vue";
import LoadingScreen from "./components/LoadingScreen";
import IntroScreen from "./components/IntroScreen";

export default {
  name: "App",
  components: {
    IntroScreen,
    LoadingScreen,
    ThreeScene,
    AudioButton
  },
};
</script>

<style lang="stylus">
@import url('https://fonts.googleapis.com/css2?family=Poppins&display=swap');

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  font-family: 'Poppins', sans-serif;
}
</style>
