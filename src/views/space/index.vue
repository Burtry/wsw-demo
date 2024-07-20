<script setup>
import { ref } from 'vue';
import SpaceItem from '../home/SpaceItem.vue'
import { getAllSpaceAPI } from "@/api/space";
const spaceList = ref([])

const limitSpaceList = ref([])
getAllSpaceAPI().then(res => {
    spaceList.value = res.data.map(space => {
        return {
            ...space,
            img: space.img ? space.img.slice(1, -1).split(',') : [],
            price: space.price + "元/天"
        }
    })

    limitSpaceList.value = spaceList.value.slice(0, 8) //只取前8个展示

})


</script>

<template>
    <div class="home-banner">
        <el-carousel height="500px">
            <el-carousel-item v-for="item in limitSpaceList" :key="item.id">
                <RouterLink :to="`/space/${item.id}`">
                    <img :src="item.img[0]" alt="">
                </RouterLink>
            </el-carousel-item>
        </el-carousel>
    </div>
    <h3>全部场地</h3>
    <div class="body">
        <SpaceItem v-for="item in spaceList" :key="item.id" :spaces="item" :id="item.id" class="spaceItem">
        </SpaceItem>
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

.spaceItem {
    /* 元素居中显示 */
    margin: 0 auto;
}
</style>