
<template>
  <div class="loadingScreen" ref="loadingScreen">
    <div class="loadingScreen_label">
      Loading
    </div>

    <div class="loadingScreen_progress" :style="{ '--progress': progress / 100 }">
      {{ progress }}%
    </div>

    <div class="loadingScreen_file">
      {{ loadedFile }}
    </div>
  </div>
</template>

<script>
import LoadingController from "../classes/LoadingController";

export default {
  name: "LoadingScreen",
  data() {
    return {
      progress: 0,
      loadedFile: '',
    }
  },
  mounted() {
    LoadingController.onProgress = this.onProgress;
    LoadingController.onLoad = this.onLoad;
  },
  methods: {
    onProgress(url, loaded, total) {
      this.loadedFile = url;
      this.progress = Math.round((loaded / total) * 100);
    },
    onLoad() {
      this.$refs.loadingScreen.classList.add('finished');
    }
  }
};
</script>

<style scoped lang="stylus">
.loadingScreen {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  position: fixed;
  inset: 0;
  z-index: 2;
  color: #fff;
  font-size: 2rem;
  text-align: center;
  background: #151515;
  transition: opacity .8s ease .6s;
}

.loadingScreen_label {
  font-weight: bold;
  font-size: 1.5rem;
  transition:
      opacity .4s ease,
      transform .6s ease;
}

.loadingScreen_progress {
  position: relative;
  isolation: isolate;
  font-size: 2rem;
  margin: .5em 0
  transition:
      opacity .4s ease .1s,
      transform .6s ease .1s;
}

.loadingScreen_progress::before,
.loadingScreen_progress::after {
  content: '';
  position: absolute;
  width: 20rem;
  height: 4px;
  z-index: -2;
  left: 50%;
  top: 50%;
  transform-origin: 0 0;
  transform: translate(-50%, -50%);
  background: #09040c;
  transition: transform .2s ease;
}

.loadingScreen_progress::after {
  z-index: -1
  transform: translate(-50%, -50%) scaleX(var(--progress, 0));
  background: rgba(107, 20, 20, 0.84);
}

.loadingScreen_file {
  font-size: 1rem;
  color: #919090;
  transition:
      opacity .4s ease .2s,
      transform .6s ease .2s;
}

.finished {
  opacity: 0;
  pointer-events: none;
}

.finished .loadingScreen_label,
.finished .loadingScreen_progress,
.finished .loadingScreen_file {
  opacity: 0;
  transform: translateY(-2rem);
}
</style>
