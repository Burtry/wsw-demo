<template>


    <div class="goods-list">
        <GoodsItem v-for="item in equipmentList" :key="item.id" :goods="item" :category="'equipment'" :id="item.id">
        </GoodsItem>
    </div>


</template>


<script setup>
import { ref } from 'vue';
import GoodsItem from '@/views/home/GoodsItem.vue';
const equipmentList = ref([
    {
        id: '1',
        name: '器材',
        picture: '404.png'
    },
    {
        id: '2',
        name: '器材',
        picture: '404.png'
    },
    {
        id: '3',
        name: '器材',
        picture: '404.png'
    },
    {
        id: '4',
        name: '器材',
        picture: '404.png'
    },
    {
        id: '5',
        name: '器材',
        picture: '404.png'
    },
    {
        id: '6',
        name: '器材',
        picture: '404.png'
    },
    {
        id: '7',
        name: '器材',
        picture: '404.png'
    }
])
</script>

<style scoped>
.goods-list {
    display: flex;
    flex-wrap: wrap;
    padding: 0 10px;
}
</style>