<template>
  <div class="app__wrapper">
    <header class="app__header">
      <Navbar />
    </header>
    <main class="app__main">
      <router-view />
    </main>
    <footer class="app__footer">
      ЭТО ПОДВАЛ
    </footer>
  </div>
</template>

<script lang="ts">

import Navbar from '@/components/Navbar.vue';
import { defineComponent } from 'vue';

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
  color: #2c3e50;
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
    top: 0; left: 0; right: 0;
    border: solid grey 3px;
    background-color: gray;
    height: 80px;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1;
  }

  .app__main {
    width: 100%;
    background-color: #202329;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .app__footer {
    width: 100%;
    background-color: gray;
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 800;
  }
}
</style>
