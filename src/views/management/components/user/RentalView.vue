<template>


    <div class="rentalList">
        <RentalItem v-for="item in rentalList" :key="item.id" :rental="item" />
    </div>
</template>


<script setup>

import RentalItem from "@/views/home/RentalItem.vue"
const rentalList = [
    {
        id: '1',
        userName: "用户1",
        EquipmentName: '器材1',
        EquipmentType: '器材类型1',
        price: '10',
        status: "租借中",
        startTime: '2023-04-12 12:00:00',
        endTime: '2023-04-12 12:00:00',
        createTime: '2023-04-18 12:00:00',
        updateTime: '2023-04-18 12:00:00',
        remark: '器材描述器材描述器材描述器材描述器材描述器材描述'
    },

    {
        id: '2',
        userName: "用户2",
        EquipmentName: '器材2',
        EquipmentType: '器材类型2',
        price: '20',
        status: "已完成",
        startTime: '2023-04-12 12:00:00',
        endTime: '2023-04-12 12:00:00',
        createTime: '2023-04-18 12:00:00',
        updateTime: '2023-04-18 12:00:00',
        remark: '器材描述器材描述器材描述器材描述器材描述器材描述'
    },
    {
        id: '3',
        userName: "用户3",
        EquipmentName: '器材3',
        EquipmentType: '器材类型3',
        price: '30',
        status: "已取消",
        startTime: '2023-04-12 12:00:00',
        endTime: '2023-04-12 12:00:00',
        createTime: '2023-04-18 12:00:00',
        updateTime: '2023-04-18 12:00:00',
    }
]
</script>

<style>
.rentalList {
    display: flex;
    flex-wrap: wrap;
    padding: 0 10px;
}
</style>