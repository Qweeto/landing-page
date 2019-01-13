<template>
  <main class="container">
    <div class="left">
      <Nav />
      <Registration />
      <SocialButtons />
    </div>
    <div class="right"><ProjectList /></div>
  </main>
</template>

<script>
import Nav from '../components/Nav.vue'
import Registration from '../components/Registration.vue'
import SocialButtons from '../components/SocialButtons.vue'
import ProjectList from '../components/ProjectList.vue'

export default {
  components: {
    Nav,
    Registration,
    SocialButtons,
    ProjectList
  }
}
</script>

<style lang="scss" scoped>
.container {
  display: grid;
  grid-template-columns: calc(50% - 0.1em) calc(50% - 0.1em);
  height: 100vh;
  column-gap: 0.2em;
  background: url(../assets/images/background.png) repeat;
}

.left {
  background: #fff;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.right {
  overflow-y: scroll;
  scroll-behavior: smooth;
}
</style>
