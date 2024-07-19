<template>

    <h1>收藏器材</h1>
    <div class="goods-list">
        <SpaceItem v-for="item in equipmentList" :key="item.id" :goods="item" :category="'equipment'" :id="item.id">
        </SpaceItem>
    </div>



    <h1>收藏场地</h1>
    <div class="goods-list">
        <SpaceItem v-for="item in spaceList" :key="item.id" :goods="item" :category="'space'" :id="item.id">
        </SpaceItem>
    </div>


</template>


<script setup>
import { ref } from 'vue';
import SpaceItem from '@/views/home/SpaceItem.vue';
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
    }
])

const spaceList = ref([

    {
        id: '1',
        name: '场地',
        picture: '404.png'
    },
    {
        id: '2',
        name: '场地',
        picture: '404.png'
    },
    {
        id: '3',
        name: '场地',
        picture: '404.png'
    },
    {
        id: '4',
        name: '场地',
        picture: '404.png'
    },
    {
        id: '5',
        name: '场地',
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