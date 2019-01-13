<template>
  <nav>
    <ul>
      <li><strong>gotois</strong></li>
      <li>about</li>
      <li>mission</li>
      <li>contact</li>
    </ul>
  </nav>
</template>

<style lang="scss" scoped>
nav {
  padding: 1em;
  width: calc(100% - 2em);

  ul {
    list-style: none;
  }
  li {
    display: inline;
    width: auto;
    cursor: pointer;

    &:first-child {
      margin-right: 1em;
    }

    &:not(:first-child):not(:last-child):after {
      content: '|';
      position: relative;
      margin: 1em;
    }
  }
}
</style>
