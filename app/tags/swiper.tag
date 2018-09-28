<swiper class="swiper-container">

  <style type="text/scss">
    @import "../styles/colors";

    $myBackground: url(../images/background.png);
    $margin-swiper: 24px;
    $swiper-font-size: 18px;

    :scope {
      display: block;
      height: 100%;
      width: 100%;
    }

    .full-image-cover {
      margin: 0;
      object-fit: contain;
      width: 100%;
      height: 100%;
      max-height: -moz-max-content;
      max-height: -webkit-fill-available;
      max-height: fill-available;
    }
  </style>

  <div class="swiper-wrapper">
    <yield></yield>

    <div class="swiper-slide" each="{val, i in opts.data}" ref="slide-{i}">
      <virtual if="{val.photo}">
        <!-- TODO: add schema.org https://yandex.ru/support/webmaster/supported-schemas/image.html -->
        <img data-src="{val.photo}"
             alt=""
             class="full-image-cover scale-up swiper-lazy"/>
        <div class="swiper-lazy-preloader"></div>
      </virtual>
      <virtual if="{val.youtube}">
        <youtube url="{val.youtube}"/>
      </virtual>
      <virtual if="{val.text}">
        {val.text}
      </virtual>
      <virtual if="{val.html}" >
        {parent.compileSlideHtmlContent(val.html, i)}
      </virtual>
    </div>
  </div>
  <div class="swiper-pagination"></div>

  <script>
    import "../../node_modules/swiper/dist/css/swiper.css";
    import Swiper from '../../node_modules/swiper/dist/js/swiper.min';

    this.compileSlideHtmlContent = (htmlContent, i = 0) => {
      this.refs['slide-' + i].innerHTML = htmlContent;
    };

    this.on('mount', () => {
      new Swiper(this.root, {
        speed: 400,
        direction: 'horizontal',
        pagination: {
          el: '.swiper-pagination',
          type: 'progressbar',
          clickable: true,
        },
        slidesPerView: 1,
        centeredSlides: true,
        spaceBetween: 8,
        grabCursor: true,
        mousewheel: true,
        preloadImages: false,
        lazy: true,
        keyboard: {
          enabled: true,
          onlyInViewport: true,
        },
        /**
         *
         * @param swiper
         * @param e {Event}
         */
        onScroll(swiper, e) {
          e.stopImmediatePropagation();
        }
      });
    });

  </script>

</swiper>
