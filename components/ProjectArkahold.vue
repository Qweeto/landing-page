<template>
  <div class="paper-wrapper">
    <div class="paper" itemscope itemtype="http://schema.org/CreativeWork">
      <h2 itemprop="name">Arkahold</h2>
      <p class="" itemprop="description">
        Classic oldschool minimalistic arkanoid with WebGL effects. 20 levels,
        bonuses and bosses. 3 controls: keyboard, mouse and gamepad
      </p>
      <section class="buttons">
        <a
          href="//www.kongregate.com/games/Baskovsky/arkahold"
          title="Play Web Game"
          tabindex="-1"
          rel="noopener noreferrer"
          target="_blank"
        >
          <img
            src="~/assets/images/vendors/kongregate.png"
            alt="Play on Kongregate"
          />
        </a>
        <a
          href="//github.com/gotois/Arkahold"
          title="Star Arkahold on GitHub"
          tabindex="-1"
          rel="noopener noreferrer"
          itemprop="url"
          target="_blank"
        >
          <img src="~/assets/images/vendors/GitHub_Logo.png" alt="" />
        </a>
      </section>
    </div>

    <DownButton />
  </div>
</template>

<style lang="scss" scoped>
.paper-wrapper {
  background-image: conic-gradient(
      rgba(255, 0, 0, 0.5),
      rgba(255, 255, 0, 0.5),
      rgba(0, 255, 0, 0.5),
      rgba(0, 255, 255, 0.5),
      rgba(0, 0, 255, 0.5),
      rgba(255, 0, 255, 0.5),
      rgba(255, 0, 0, 0.5)
    ),
    url('./../assets/images/pic/arkahold/01.png'),
    url('./../assets/images/pic/arkahold/02.png'),
    url('./../assets/images/pic/arkahold/03.png');
}
</style>

<script>
import ProjectBase from './ProjectBase.vue'
export default {
  extends: ProjectBase
}
</script>
