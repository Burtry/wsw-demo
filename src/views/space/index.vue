<script setup>
import { ref } from 'vue';
import GoodsItem from '../home/GoodsItem.vue'
const bannerList = ref([
    {
        id: 1,
        imgUrl: 'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2066abf7e33d583bjpeg.jpeg'
    },
    {
        id: 2,
        imgUrl: 'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2d13fe76c56e505490jpeg.jpeg'
    },
    {
        id: 3,
        imgUrl: 'https://fuss10.elemecdn.com/0/6f/e35ff3758149bf9669b8jpeg.jpeg'
    },
    {
        id: 4,
        imgUrl: 'https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbjpeg.jpeg'
    },
    {
        id: 5,
        imgUrl: 'https://fuss10.elemecdn.com/d/e6/0fc7240532fdaf769a25683617711jpeg.jpeg'
    },

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
        id: '4',
        name: '场地',
        picture: '404.png'
    }
])
</script>

<template>
    <div class="home-banner">
        <el-carousel height="500px">
            <el-carousel-item v-for="item in bannerList" :key="item.id">
                <img :src="item.imgUrl" alt="">
            </el-carousel-item>
        </el-carousel>
    </div>
    <h3>全部场地</h3>
    <div class="body">
        <GoodsItem v-for="item in spaceList" :key="item.id" :goods="item" :category="'space'" :id="item.id"></GoodsItem>
    </div>

</template>

<style>
h3 {
    font-size: 28px;
    color: #666;
    font-weight: normal;
    text-align: center;
    line-height: 100px;
}

.home-banner {
    width: 1240px;
    height: 500px;
    margin: 0 auto;
    left: 0;
    top: 0;
    z-index: 98;

    img {
        width: 100%;
        height: 500px;
    }
}

.body {
    display: flex;
    flex-wrap: wrap;
    padding: 0 10px;
}
</style>