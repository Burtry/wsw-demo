<template>

    <div>
        <h1>收藏场地</h1>
        <div class="goods-list">
            <FavoriteItem v-for="item in spaceList" :key="item" :favorite="item" category="space"
                :id="item.favoriteId" />
        </div>
    </div>
    <h1>收藏器材</h1>
    <div class="goods-list">
        <FavoriteItem v-for="item in equipmentList" :key="item.id" :favorite="item" category="equipment"
            :id="item.favoriteId" />
    </div>
</template>


<script setup>
import { ref } from 'vue';
import { getFavoriteAPI } from "@/api/favorite";
import FavoriteItem from "@/views/home/FavoriteItem.vue"
const spaceList = ref([])
const equipmentList = ref([])
const favoriteList = ref([])

getFavoriteAPI().then(res => {

    favoriteList.value = res.data.map(item => {
        return {
            ...item,
            img: item.img ? item.img.slice(1, -1).split(",") : []
        }
    })
    //根据favoriteType字段进行分类
    favoriteList.value.forEach(item => {
        if (item.favoriteType === 1) {
            spaceList.value.push(item)
        } else if (item.favoriteType === 2) {
            equipmentList.value.push(item)
        }
    })

    console.log(spaceList.value)
    console.log(equipmentList.value);
})

</script>

<style scoped>
.goods-list {
    display: flex;
    flex-wrap: wrap;
    padding: 0 10px;
}
</style>