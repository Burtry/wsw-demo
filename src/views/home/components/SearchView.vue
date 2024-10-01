<script setup>
import { searchAPI } from "@/api/search";
import { ref, onMounted, watch } from "vue";
import EquipmentItem from "../EquipmentItem.vue";

import { useRoute } from "vue-router";
const route = useRoute();

const searchResult = ref({})

const searchInput = ref(route.query.searchInput || '');

async function handleSearch() {
    searchResult.value = await searchAPI(searchInput.value); // 发送 API 请求
    console.log(searchResult.value);
}

onMounted(() => {
    handleSearch();
})

// 监听路由的查询参数变化，触发搜索
watch(() => route.query.searchInput, (newSearchInput) => {
    searchInput.value = newSearchInput || '';
    handleSearch();
});

const equipmentList = ref([
    {
        id: 1,
        equipmentName: "设备1",
        description: "这是设备1的描述",
        rentalPrice: 100,
        image: "https://example.com/image1.jpg",
        location: "地点1",
        status: "可用",
        type: "类型1",
        capacity: 10,
        available: true,
        favorite: false,
    },
    {
        id: 2,
        equipmentName: "设备2",
        description: "这是设备2的描述",
        rentalPrice: 200,
        image: "https://example.com/image2.jpg",
        location: "地点2",
        status: "不可用",
        type: "类型2",
        capacity: 20,
        available: false,
        favorite: false,
    },
    {
        id: 2,
        equipmentName: "设备2",
        description: "这是设备2的描述",
        rentalPrice: 200,
        image: "https://example.com/image2.jpg",
        location: "地点2",
        status: "不可用",
        type: "类型2",
        capacity: 20,
        available: false,
        favorite: false,
    }

])

</script>


<template>
    <div style="height: 600px;">
        <div class="body">
            <EquipmentItem v-for="item in equipmentList" :key="item.id" :equipments="item" :id="item.id"
                class="equipment-item">
            </EquipmentItem>
        </div>
    </div>


</template>


<style scoped>
.body {
    display: flex;
    flex-wrap: wrap;
    padding: 0 10px;
    margin-top: 20px;
    margin-left: 8%;
    margin-right: 8%;
}
</style>