<template>
  <div class="app__wrapper">
    <header class="app__header">
      <Navbar />
    </header>
    <main class="app__main">
      <router-view />
    </main>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import Navbar from '@/components/Navbar.vue';

export default defineComponent({
  components: {
    Navbar,
  }
})

</script>

<style lang="scss" >
* {
  padding: 0;
  margin: 0;
  list-style: none;
  box-sizing: border-box;
}

#app {
  overflow-x: hidden;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: $color-light-black;
  background-color: $color-black;
  min-height: 100vh;
}

.app__wrapper {
  position: relative;
  display: flex;
  margin-top: 80px;
  width: 100%;
  overflow-x: hidden;
  flex-direction: column;

  .app__header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    background-color: $color-white;
    height: 80px;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1;
  }

  .app__main {
    width: 100%;
    display: flex;
    justify-content: center;
    padding: 1.25em;
  }
}
</style>
