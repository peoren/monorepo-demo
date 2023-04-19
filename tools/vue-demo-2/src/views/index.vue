<template>
  <div class="login-container">
    {{ num }}
  </div>
</template>

<script lang="ts" setup>
defineOptions({
  name: 'Login'
})

const num = ref(0)
</script>

<style lang="scss" scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 100%;
}
</style>
