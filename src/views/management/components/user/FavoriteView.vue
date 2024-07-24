<template>
    <div class="favorites-container">
        <div>
            <h1>收藏场地</h1>
            <div class="goods-list">
                <FavoriteItem v-for="item in spaceList" :key="item" :favorite="item" category="space"
                    :id="item.favoriteId" :cancel="() => { deleteFavorite(item.id) }" />
            </div>
        </div>
        <h1>收藏器材</h1>
        <div class="goods-list">
            <FavoriteItem v-for="item in equipmentList" :key="item.id" :favorite="item" category="equipment"
                :id="item.favoriteId" :cancel="() => { deleteFavorite(item.id) }" />
        </div>
    </div>

</template>


<script setup>
import { ref } from 'vue';
import { getFavoriteAPI, deleteFavoriteAPI } from "@/api/favorite";
import FavoriteItem from "@/views/home/FavoriteItem.vue"
import { ElMessage } from "element-plus";
const spaceList = ref([])
const equipmentList = ref([])
const favoriteList = ref([])

const deleteFavorite = (id) => {
    deleteFavoriteAPI(id).then(res => {
        if (res.code === 1) {
            ElMessage({
                message: "取消收藏成功",
                type: "success"
            })
            getFavorite()
        }
        else {
            ElMessage({
                message: "取消收藏失败",
                type: "error"
            })
        }
    })
}

const getFavorite = () => {
    getFavoriteAPI().then(res => {

        spaceList.value = []
        equipmentList.value = []

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
}
getFavorite()


</script>

<style scoped>
.goods-list {
    display: flex;
    flex-wrap: wrap;
    min-height: 260px;
    padding: 0 10px;
}
</style>