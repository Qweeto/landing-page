<promo>

  <style type="text/scss">
    @import "../styles/fonts";
    @import "../styles/colors";

    //noinspection CssInvalidPseudoSelector
    :scope {
      width: 100%;
      height: 100%;
      flex-direction: column;
      display: flex;
    }

    .logo-container {
      display: flex;
      flex: 1;
      justify-content: center;
      width: calc(100% - 58px);
      margin: auto;
      align-items: flex-end;
      align-self: center;

      > .description {
        max-width: 99vw;
        color: $white-color;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        font-size: 5vmax;
        z-index: 1;
        transition: text-shadow .1s ease-in-out;
        will-change: text-shadow;
        text-align: center;
        text-rendering: optimizeLegibility;
        font-weight: 700;
        letter-spacing: .1em;
        text-shadow: 0 0 16px hsla(0, 0, 0, .6);
        line-height: 1.5em;
        font-family: $fontDefaultFamily;
      }

    }

    .text-container {
      display: flex;
      height: 50%;
      width: 100%;
      top: 0;
      left: 0;
      right: 0;
      justify-content: space-between;
      align-items: center;
      flex-direction: column;

      > .description {
        padding: 0 8px;
        background-color: $black-color;
        color: $white-color-light;
        text-shadow: 0 0 16px hsla(0, 0, 0, .6);
        line-height: 1.5em;
        font-family: $fontMonoFamily;
      }

      > .scroll-down-text {
        position: absolute;
        width: 100%;
        left: 0;
        right: 0;
        bottom: 64px;
        text-align: center;
        margin: 0;
        color: $white-color;
        padding: 0 8px;
        font-size: smaller;
        font-family: $fontMonoFamily;
      }

    }

  </style>

  <div class="logo-container">
    <!--class: shake-down-->
    <h1 ref="logo"
        class="description"
        title="gotois: Play anywhere">goto&thinsp;Interactive&nbsp;Software</h1>
  </div>
  <div class="text-container">
    <!--class: shake-up-->
    <h2 class="description">Play&nbsp;anywhere</h2>
    <p class="scroll-down-text">Scroll down for details</p>
  </div>

  <script>
    import debounce from '../scripts/utils/debounce';
    import throttle from '../scripts/utils/throttle';

    class Sun {
      /**
       *
       * @param elem {HTMLElement}
       */
      constructor(elem) {
        this.mainBlock = elem;
        this._setWindSize();
        this.mouse = {x: 0, y: 0};
        this.onResize = debounce(this._setWindSize.bind(this), 50);
        this.onControlMove = throttle(this._controlMove.bind(this), 50);
      }
      /**
       *
       * @return {ClientRect}
       */
      get mainBlockClientRect() {
        return this.mainBlock.getBoundingClientRect();
      }
      /**
       *
       * @private
       */
      _setWindSize() {
        const mainBlockClientRect = this.mainBlockClientRect;
        this.wind = {
          w: parseInt(mainBlockClientRect.width),
          h: parseInt(mainBlockClientRect.height),
        };
      }
      /**
       *
       * @param e {MouseEvent}
       * @private
       * @return {void}
       */
      _controlMove(e) {
        if (opts.paused) {
          return;
        }

        this.mouse.x = ((e.clientX || 0) - this.mainBlock.offsetLeft + (this.mainBlock.offsetWidth / 2)) >> 0;
        this.mouse.y = ((e.clientY || 0) - this.mainBlock.offsetTop + (this.mainBlock.offsetHeight / 2)) >> 0;
        this.onTick();
      }
      /**
       * @return {void}
       */
      onTick() {
        let textShadow = '';
        let i = 6;
        const len = i;
        const mouse = this.mouse;
        const wind = this.wind;

        while (i--) {
          textShadow += `${ Math.round(i * -((mouse.x - (wind.w)) / 100)) }px
          ${ Math.round(i * -((mouse.y - wind.h) / 100)) }px
          ${ (i * 5) }px hsla(255, 255%, 255%, ${ 1 / (len - 1) })`;

          if (i > 0) {
            textShadow += ',';
          }

        }

        this.mainBlock.style.textShadow = textShadow;
      }

    }

    let sun;

    this.on('mount', () => {
      sun = new Sun(this.refs.logo);
      window.addEventListener('resize', sun.onResize);
      document.addEventListener('pointermove', sun.onControlMove);
      sun.onResize();
    });

    this.on('unmount', () => {
      if (sun) {
        document.removeEventListener('pointermove', sun.onControlMove);
        window.removeEventListener('resize', sun.onResize);
      }
    });

  </script>

</promo>
