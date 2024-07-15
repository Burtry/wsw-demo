<template>
    <div class="reserveList">
        <ReserveItem v-for="item in reservationsList" :key="item.id" :reserve="item" />
    </div>



</template>


<script setup>
import ReserveItem from '@/views/home/ReserveItem.vue'
import { getReserveTextAPI } from "@/api/reserve.js";
import { ref } from 'vue';
const reservationsList = ref([])
getReserveTextAPI().then(res => { reservationsList.value = res.data })

</script>

<style>
.reserveList {
    display: flex;
    flex-wrap: wrap;
    padding: 0 10px;
}
</style>