<template>

    <Head />

    <div id="main" class=" container">
        <div class="container">

        </div>
    </div>
</template>

<script setup>
import Head from '../components/head.vue'
import { useRoute } from 'vue-router';
const route = useRoute()
route.params.productId
</script>

<style lang='scss' scoped>
.container {
    width: 1226px;
    margin: 0 auto;
}
</style>