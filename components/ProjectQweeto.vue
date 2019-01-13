<template>
  <div class="paper-wrapper">
    <div class="paper" itemscope itemtype="http://schema.org/CreativeWork">
      <h2 itemprop="name">Qweeto</h2>
      <h3 class="" itemprop="description">Social travel starts here</h3>

      <a
        href="//t.me/qweeto"
        title="Telegram channel"
        tabindex="-1"
        rel="noopener noreferrer nofollow"
        target="_blank"
        >Telegram channel</a
      >
      <a
        href="//qweeto.com/"
        title="Open Qweeto"
        itemprop="url"
        rel="noopener"
        target="_blank"
        >Run Qweeto
      </a>
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
    url('./../assets/images/pic/qweeto/01.webp');
}
</style>

<script>
import ProjectBase from './ProjectBase.vue'
export default {
  extends: ProjectBase
}
</script>
