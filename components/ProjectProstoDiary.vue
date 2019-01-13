<template>
  <div class="paper-wrapper">
    <div class="paper" itemscope itemtype="http://schema.org/CreativeWork">
      <h2 itemprop="name">ProstoDiary</h2>
      <h3 class="" itemprop="description">
        Daily journal Telegram Bot Day using aes-256-ctr crypto
      </h3>
      <section class="buttons">
        <a
          href="//github.com/gotois/ProstoDiary_bot"
          title="Star ProstoDiary_bot on GitHub"
          tabindex="-1"
          rel="noopener noreferrer"
          itemprop="url"
          target="_blank"
        >
          <img src="~/assets/images/vendors/GitHub_Logo.png" alt="" />
        </a>
      </section>
    </div>
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
    url('./../assets/images/pic/prosto-diary/01.png'),
    url('./../assets/images/pic/prosto-diary/02.png'),
    url('./../assets/images/pic/prosto-diary/03.png');
}
</style>

<script>
import ProjectBase from './ProjectBase.vue'
export default {
  extends: ProjectBase
}
</script>
