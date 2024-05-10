<script setup>
import LayoutNav from './components/LayoutNav.vue'
import LayoutHead from './components/LayoutHead.vue'
import LayoutFooter from './components/LayoutFooter.vue'
import LayoutFixed from './components/LayoutFixed.vue'


</script>

<template>
    <LayoutNav />
    <LayoutHead />
    <RouterView />
    <LayoutFooter />
    <LayoutFixed />
</template>
