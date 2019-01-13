<template>
  <div class="paper-wrapper">
    <div class="paper" itemscope itemtype="http://schema.org/CreativeWork">
      <h2 itemprop="name">Botris</h2>
      <h3 class="" itemprop="description">Use your mind to win!</h3>
      <section class="buttons">
        <a
          href="//play.google.com/store/apps/details?id=com.tewst.botris"
          title="Install Android Game"
          tabindex="-1"
          rel="noopener noreferrer"
          itemprop="url"
          target="_blank"
        >
          <img
            src="~/assets/images/vendors/googleplay.png"
            alt="Get it on Google Play"
          />
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
    url('./../assets/images/pic/botris/01.jpg'),
    url('./../assets/images/pic/botris/02.jpg'),
    url('./../assets/images/pic/botris/03.jpg');
}
</style>

<script>
import ProjectBase from './ProjectBase.vue'
export default {
  extends: ProjectBase
}
</script>
