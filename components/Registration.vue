<template>
  <div class="gotois-header">
    <h1 ref="logo" class="description" title="gotois: Play anywhere">
      goto&thinsp;Interactive&nbsp;Software
    </h1>
    <button class="connect-button">Connect</button>
  </div>
</template>

<style lang="scss" scoped>
.gotois-header {
  left: 3em;
  position: relative;
  margin-top: auto;
  margin-bottom: auto;
  width: calc(100% - 2em);
  z-index: 1;
}

.connect-button {
  border: 1px solid black;
  border-left: 3px solid red;
  width: 100%;
  line-height: 3;
}

.description {
  max-width: 100%;
  color: currentColor;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-size: 3.2vmax;
  transition: text-shadow 0.1s ease-in-out;
  will-change: text-shadow;
  text-align: left;
  text-rendering: optimizeLegibility;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-shadow: 0 0 16px hsla(0, 0, 0, 0.6);
  line-height: 1.5em;
  background: -webkit-linear-gradient(transparent, transparent),
    url(../assets/images/background.png) repeat;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>

<script>
import debounce from 'lodash/debounce'
import throttle from 'lodash/throttle'

export default {
  props: {
    paused: Boolean
  },
  mounted() {
    this._setWindSize()
    this.mouse = { x: 0, y: 0 }
    this.onResize = debounce(this._setWindSize, 50)
    this.onControlMove = throttle(this._controlMove, 50)

    window.addEventListener('resize', this.onResize)
    document.addEventListener('pointermove', this.onControlMove)
    this.onResize()
  },

  beforeDestroy() {
    document.removeEventListener('pointermove', this.onControlMove)
    window.removeEventListener('resize', this.onResize)
  },

  methods: {
    /**
     *
     * @private
     */
    _setWindSize() {
      const mainBlockClientRect = this.$refs.logo.getBoundingClientRect()
      this.wind = {
        w: parseInt(mainBlockClientRect.width),
        h: parseInt(mainBlockClientRect.height)
      }
    },
    /**
     *
     * @param e {MouseEvent}
     * @private
     * @return {void}
     */
    _controlMove(e) {
      if (this.paused || !this.$refs.logo) {
        return
      }

      this.mouse.x =
        ((e.clientX || 0) -
          this.$refs.logo.offsetLeft +
          this.$refs.logo.offsetWidth / 2) >>
        0
      this.mouse.y =
        ((e.clientY || 0) -
          this.$refs.logo.offsetTop +
          this.$refs.logo.offsetHeight / 2) >>
        0
      this.onTick()
    },
    /**
     * @return {void}
     */
    onTick() {
      let textShadow = ''
      let i = 6
      const len = i
      const mouse = this.mouse
      const wind = this.wind
      while (i--) {
        textShadow += `${Math.round(i * -((mouse.x - wind.w) / 100))}px
          ${Math.round(i * -((mouse.y - wind.h) / 100))}px
          ${i * 5}px hsla(255, 255%, 255%, ${1 / (len - 1)})`

        if (i > 0) {
          textShadow += ','
        }
      }

      this.$refs.logo.style.textShadow = textShadow
    }
  }
}
</script>
