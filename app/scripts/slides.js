(function () {
  'use strict';

  Array
    .from(document.querySelectorAll('.swiper-container'))
    .forEach(swiperContainer => {
      new Swiper(swiperContainer, {
        direction: 'horizontal',
        pagination: '.swiper-pagination',
        paginationType: 'progress',
        scrollbarHide: true,
        slidesPerView: 1,
        centeredSlides: true,
        paginationClickable: true,
        spaceBetween: 30,
        grabCursor: true,
        loop: false,
        mousewheelControl: true,
        preloadImages: false,
        lazyLoading: true,
        keyboardControl: true,
        onScroll(swiper, e) {
          e.stopImmediatePropagation();
        },
        onLazyImageReady(swiper, slide) {
          const loadingElem = slide.querySelector('.loading');

          if (loadingElem) {
            loadingElem.parentElement.removeChild(loadingElem);
          }

        }
      });
    });

}());
