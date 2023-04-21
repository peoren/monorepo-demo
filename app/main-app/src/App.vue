<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue'
import Tool from 'vue-demo-ts-tool/src/App.vue'
import ToolPage from 'vue-demo-ts-tool/src/components/tool-page.vue'
</script>

<template>
  rush
  main
  <Tool></Tool>
  <ToolPage></ToolPage>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
