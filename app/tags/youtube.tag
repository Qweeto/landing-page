<youtube itemprop="video" itemscope itemtype="http://schema.org/VideoObject">

  <style type="text/scss">
    @import "../styles/colors";

    :scope {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
      margin: 0;

      &img {
        margin: auto;
        opacity: .7;
        align-self: center;
        width: 100%;
        height: auto;
      }

      .play-button {
        position: absolute;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 90px;
        height: 60px;
        background-color: rgba(0, 0, 0, .6);
        box-shadow: 0 0 30px rgba(0, 0, 0, .6);
        z-index: 1;
        border-radius: 6px;
        transition: background .22s ease;
        cursor: pointer;
        margin: inherit;
        top: 50%;
        left: 50%;
        bottom: 0;
        transform: translate3d(-50%, -50%, 0);
        -webkit-backdrop-filter: blur(4px);

        &[hidden] {
          visibility: hidden;
        }

        &:before {
          position: absolute;
          content: '';
          border-style: solid;
          border-width: 15px 0 15px 26px;
          border-color: transparent transparent transparent white;
        }

        &:hover {
          background-color: $complement-color;
        }
      }

      iframe {
        height: 100%;
        width: 100%;
        top: 0;
        left: 0;
        border: none;
        position: absolute;
        display: block;
        bottom: 0;
        right: 0;
      }

    }

    .cover {
      object-fit: contain;
      height: 100%;
      width: 100%;
      max-width: 100%;
      max-height: 100%;
      margin: 0;
    }
  </style>

  <meta itemprop="thumbnailUrl" content="{imageSrc}"/>
  <meta itemprop="contentUrl" content="{iframeSrc}"/>

  <div class="play-button" itemprop="name"></div>

  <script>
    import {isMobile} from '../scripts/utils/isMobile';

    const imageSize = ytImageSize();

    this.imageSrc = `//img.youtube.com/vi/${ this.opts.url }/${ imageSize }.jpg`;
    this.iframeSrc = `//www.youtube.com/embed/${ this.opts.url }?rel=0&showinfo=0&autoplay=1&frameborder=0&color=white&controls=0&disablekb=0&fs=0&modestbranding=1&html5=1`;

    this.on('mount', () => {
      const currentYT = this.root;

      const image = new Image();
      const iframe = document.createElement('iframe');
      const playButton = currentYT.querySelector('.play-button');
      image.src = this.imageSrc;
      image.alt = 'Show video';
      image.classList.add('cover');
      image.addEventListener('load', () => currentYT.appendChild(image));
      image.addEventListener('error', () => {
        if (currentYT.parentElement) {
          currentYT.parentElement.remove();
        }
      });

      playButton.addEventListener('click', () => {
        if (!playButton.hidden) {
          iframe.src = this.iframeSrc;
          currentYT.insertBefore(iframe, image);
          playButton.hidden = true;
        }
      });

      iframe.addEventListener('load', () => {
        image.style.display = 'none';

        if (isMobile()) {
          image.hidden = true;
        } else {
          image.style.opacity = '0';
        }
      });
    });

    /**
     * mqdefault (320×180 pixels)
     * hqdefault (480×360 pixels)
     * sddefault (640×480 pixels)
     * maxresdefault (1920×1080 pixels)
     * @return {String}
     */
    function ytImageSize() {
      const minSide = (() => {
        if (window.innerWidth <= window.innerHeight) {
          return window.innerWidth;
        } else {
          return window.innerHeight;
        }
      })();

      return (() => {
        if (minSide <= 180 * 2) {
          return 'mqdefault';
        } else if (minSide <= 360 * 2) {
          return 'hqdefault';
        } else if (minSide <= 480 * 2) {
          return 'sddefault';
        } else {
          return 'maxresdefault';
        }
      })();
    }

  </script>
</youtube>
