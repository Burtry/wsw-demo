<script setup>
import HomePanel from '../HomePanel.vue'
import { ref } from 'vue'
import { getAllEquipmentAPI } from "@/api/equipment.js";


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

    limitEquipmentList.value = equipmentList.value.slice(0, 5) //只取前5个展示
})




</script>

<template>
    <HomePanel title="器材展示" sub-title="器材展示 副标题" category="equipment">
        <template #main>
            <ul class="goods-list">
                <li v-for="item in limitEquipmentList" :key="item.id">
                    <RouterLink :to="`/equipment/${item.id}`" class="goods-item">
                        <img :src="item.img[0]" alt="" />
                        <p class="name">{{ item.equipmentName }}</p>
                        <p class="price">{{ item.rentalPrice }}</p>
                    </RouterLink>
                </li>
            </ul>
        </template>
    </HomePanel>
</template>


<style scoped lang='scss'>
.goods-list {
    display: flex;
    justify-content: space-between;
    height: 406px;

    li {
        width: 306px;
        height: 406px;

        background: #fff;
        transition: all .5s;

        &:hover {
            transform: translate3d(0, -3px, 0);
            box-shadow: 0 3px 8px rgb(0 0 0 / 20%);
        }

        img {
            width: 306px;
            height: 306px;
        }

        p {
            font-size: 22px;
            padding-top: 12px;
            text-align: center;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
        }

        .price {
            color: #cf4444;
        }
    }
}
</style>