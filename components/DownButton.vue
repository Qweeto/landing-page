<template>
  <div class="container"></div>
</template>

<style lang="scss" scoped>
$downButtonSize: 24px;
$downButtonImage: url(../assets/images/down.svg);

.container:not([hidden]) {
  position: absolute;
  display: flex;
  flex: 1;
  left: 50%;
  background: initial;
  height: $downButtonSize;
  justify-content: center;
  bottom: $downButtonSize;
  margin: 0 - ($downButtonSize / 2);
  z-index: 1;
  mix-blend-mode: overlay;

  &::before,
  &::after {
    content: '';
    width: $downButtonSize;
    height: $downButtonSize;
    background-image: $downButtonImage;
    background-color: transparent;
    background-size: contain;
    background-repeat: no-repeat;
  }

  &::before {
    position: absolute;
    cursor: pointer;
    z-index: 1;
  }

  &::after {
    position: relative;
    /*animation-duration: .9s;*/
    /*animation-name: slide-in;*/
    /*animation-iteration-count: infinite;*/
    /*animation-timing-function: ease-in-out;*/
  }
}
</style>
