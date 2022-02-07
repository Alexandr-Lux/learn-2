<template>
  <div id="root" class="root dark-theme">
    <router-view/>
  </div>
</template>

<style lang="scss">
@import url('./base.scss');

.root {
  max-width: 100%;
  height: 100vh;
  overflow: hidden;
}

::-webkit-scrollbar {
  width: 5px;
  &:vertical {
    height: 5px;
  }
}

::-webkit-scrollbar-thumb {
  background-color: #5398e0;
  border-radius: 4px;
}
</style>
