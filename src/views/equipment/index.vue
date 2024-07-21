<script setup>
import { ref } from 'vue';
import EquipmentItem from '../home/EquipmentItem.vue'
import { getAllEquipmentAPI } from "@/api/equipment.js";
// const bannerList = ref([])
const equipmentList = ref([])
const limitEquipmentList = ref([])

getAllEquipmentAPI().then(res => {
    equipmentList.value = res.data.map(equipment => {
        return {
            ...equipment,
            img: equipment.img ? equipment.img.slice(1, -1).split(',') : [],
            rentalPrice: equipment.rentalPrice + "元/天"
        }
    })

    limitEquipmentList.value = equipmentList.value.slice(0, 8)
})
</script>

<template>
    <div class="home-banner">
        <el-carousel height="500px">
            <el-carousel-item v-for="item in limitEquipmentList" :key="item.id">
                <RouterLink :to="`/equipment/${item.id}`">
                    <img :src="item.img[0]" alt="">
                </RouterLink>
            </el-carousel-item>
        </el-carousel>
    </div>
    <h3>全部器材</h3>
    <div class="body">
        <EquipmentItem v-for="item in equipmentList" :key="item.id" :equipments="item" :id="item.id"
            class="equipmentItem">
        </EquipmentItem>
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

.equipmentItem {
    /* 元素居中显示 */
    margin: 0 auto;
}
</style>