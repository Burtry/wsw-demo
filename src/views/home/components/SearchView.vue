<script setup>
import { searchAPI } from "@/api/search";
import { ref, onMounted, watch } from "vue";
import SearchItem from "../SearchItem.vue";

import { useRoute } from "vue-router";
const route = useRoute();

const searchResult = ref({})

const searchInput = ref(route.query.searchInput || '');

async function handleSearch() {
    const result = await searchAPI(searchInput.value); // 发送 API 请求
    //url为[url]，转换成url

    searchResult.value = result.data.map(item => {
        return {
            ...item,
            url: item.url ? item.url.slice(1, -1).split(',') : [],
            price: item.price + "元/天"
        }
    });
}

onMounted(() => {
    handleSearch();
})

// 监听路由的查询参数变化，触发搜索
watch(() => route.query.searchInput, (newSearchInput) => {
    searchInput.value = newSearchInput || '';
    handleSearch();
});


</script>


<template>
    <div style="height: 600px;">
        <div class="body">
            <SearchItem v-for="item in searchResult" :key="item.id" :searchList="item" :id="item.id" :type="item.type"
                class="equipment-item">
            </SearchItem>
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