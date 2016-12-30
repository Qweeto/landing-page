(function() {
  'use strict';
  // TODO: использовать стиль для кнопки http://codepen.io/koenigsegg1/pen/BKwRpp

  const imageSize = ytImageSize();
  Array
    .from(document.querySelectorAll('.youtube'))
    .forEach(currentYT => {
      const image = new Image();
      image.src = `//img.youtube.com/vi/${ currentYT.dataset.embed }/${ imageSize }.jpg`;
      image.addEventListener('load', () => currentYT.appendChild(image));
      currentYT.addEventListener('click', () => {
        const iframe = document.createElement('iframe');
        iframe.setAttribute('frameborder', '0');
        iframe.setAttribute('allowfullscreen', '');
        iframe.src = `//www.youtube.com/embed/${ currentYT.dataset.embed }?rel=0&showinfo=0&autoplay=1&html5=1`;
        currentYT.innerHTML = '';
        currentYT.appendChild(iframe);
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
    let minSide = 0;

    if (window.innerWidth <= window.innerHeight) {
      minSide = window.innerWidth;
    } else {
      minSide = window.innerHeight;
    }

    if (minSide <= 180 * 2) {
      return 'mqdefault';
    } else if (minSide <= 360 * 2) {
      return 'hqdefault';
    } else if (minSide <= 480 * 2) {
      return 'sddefault';
    } else {
      return 'maxresdefault';
    }

  }

})();
