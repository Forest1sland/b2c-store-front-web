<template>
  <RouterView v-if="isRouterAlive" />

</template>

<script setup>
import { provide, ref, nextTick } from 'vue';
const isRouterAlive = ref(true)
const reload = () => {
  isRouterAlive.value = false
  nextTick(() => {
    isRouterAlive.value = true
  })
}

provide('reload', reload)
</script>

<style lang="scss">

</style>