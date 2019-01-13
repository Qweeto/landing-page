<template>
  <div class="paper-list">
    <ProjectQweeto />
    <ProjectArkahold />
    <ProjectBotris />
    <ProjectProstoDiary />
  </div>
</template>

<style lang="scss" scoped>
$fontSize: 1.074em;

.paper-list {
  display: grid;
  grid-auto-rows: minmax(100vh, auto);
  grid-row-gap: 0.5em;
}

/deep/ h2 {
  background: url(../assets/images/background.png) repeat;
  color: currentColor;
  display: block;
  /*background: -webkit-linear-gradient(lighten(#000, 30%), #000);*/
  -webkit-background-clip: text;
  //noinspection CssInvalidPropertyValue
  background-clip: text;
  -webkit-text-fill-color: hsla(0, 0, 0, 0);
  font-size: 4vmax;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}

/deep/ .paper {
  margin: 1em;
  align-self: center;
  justify-self: center;
  background: white;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
}

/deep/ .paper-wrapper {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  width: 100%;
  background-repeat: no-repeat, no-repeat, no-repeat;
  background-position: bottom right, left, right;
  background-size: contain;
}

/deep/ img {
  width: 100%;
  margin: 0;
  object-fit: contain;
  height: 100%;
  //noinspection CssInvalidPropertyValue
  max-height: -moz-max-content;
  //noinspection CssInvalidPropertyValue
  max-height: -webkit-fill-available;
  //noinspection CssInvalidPropertyValue
  max-height: stretch;
}
</style>

<script>
import ProjectQweeto from './ProjectQweeto.vue'
import ProjectArkahold from './ProjectArkahold.vue'
import ProjectBotris from './ProjectBotris.vue'
import ProjectProstoDiary from './ProjectProstoDiary.vue'

export default {
  components: {
    ProjectQweeto,
    ProjectArkahold,
    ProjectBotris,
    ProjectProstoDiary
  }
}
</script>
