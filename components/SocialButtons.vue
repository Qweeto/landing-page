<template>
  <section class="social-buttons">
    <!--todo Facebook-->
    <a
      class="trello-sprite"
      title="Trello group"
      href="//trello.com/gotois"
      rel="noopener noreferrer"
      target="_blank"
      >Trello
    </a>
    <a
      class="twitter-sprite"
      title="Twitter group"
      href="//twitter.com/tewstindie"
      rel="noopener noreferrer"
      target="_blank"
      >Twitter
    </a>
    <a
      class="github-sprite"
      title="Github"
      href="//github.com/gotois"
      rel="noopener noreferrer"
      target="_blank"
      >GitHub
    </a>
  </section>
</template>

<style lang="scss" scoped>
$social-btn-width: 32px;
$social-btn-height: 32px;

.social-buttons {
  padding: 1em;
  display: flex;
  flex-direction: row;
  width: 100%;
  overflow-x: auto;
  overflow-y: hidden;
  align-self: flex-start;
  align-items: flex-end;
}

a {
  display: block;
  float: left;
  width: 32px;
  height: 32px;
  background: no-repeat 50% 50%;
  background-size: contain;
  line-height: 32px;
  text-align: center;
  color: transparent;
  opacity: 1;
  margin: 0 0.5em;

  &:first-child {
    margin-left: 0;
  }

  &:last-child {
    margin-right: 0;
  }

  &:hover {
    opacity: 0.8;
  }
}

.twitter-sprite {
  background-image: url(../assets/images/vendors/twitter-logo.png);
}

.trello-sprite {
  background-image: url(../assets/images/vendors/trello-logo.png);
}

.github-sprite {
  background-image: url(../assets/images/vendors/github-social-logo.png);
}
</style>
