
<template>
    <div class="introScreen">
      <h1>SomeCoolStuff</h1>
      <p>For real, it does something!</p>
    </div>
</template>

<script>
export default {
    name: "IntroScreen",
    mounted() {
    },
};
</script>

<style scoped lang="stylus">
.introScreen {
  position: fixed;
  top: 25%;
  left: 10%;
  z-index: 1
  color: #fff;

  h1 {
    font-size 3rem;
    font-weight bold;
    margin: 0;
  }

  p {
    font-size 1.375rem;
    margin-top: .25em;
  }
}
</style>
