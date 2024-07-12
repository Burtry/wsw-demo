<template>
    <div class="reserveList">
        <ReserveItem v-for="item in reserveList" :key="item.id" :reserve="item" />
    </div>

</template>


<script setup>
import ReserveItem from '@/views/home/ReserveItem.vue'
const reserveList = [
    {
        id: '1',
        spaceName: "场地1",
        spaceType: '场地类型1',
        startTime: '2023-04-12 12:00:00',
        endTime: '2023-04-12 12:00:00',
        status: "已预约",
        location: '位置1',
        price: '100',
        createTime: '2023-04-12 12:00:00',
        updateTime: '2023-04-12 12:00:00',
        remark: '场地描述场地描述场地描述场地描述场地描述场地描述场地描述'
    },
    {
        id: '2',
        spaceName: "场地2",
        spaceType: '场地类型2',
        status: "已完成",
        startTime: '2023-04-12 12:00:00',
        endTime: '2023-04-12 12:00:00',
        location: '位置2',
        price: '200',
        createTime: '2023-04-12 12:00:00',
        updateTime: '2023-04-12 12:00:00',
        remark: '场地描述场地描述场地描述场地描述场地描述场地描述场地描述'
    },

    {
        id: '3',
        spaceName: "场地3",
        spaceType: '场地类型3',
        status: "进行中",
        startTime: '2023-04-12 12:00:00',
        endTime: '2023-04-12 12:00:00',
        location: '位置3',
        price: '300',
        createTime: '2023-04-12 12:00:00',
        updateTime: '2023-04-12 12:00:00',
        remark: '场地描述场地描述场地描述场地描述场地描述场地描述场地描述'
    }
]
</script>

<style>
.reserveList {
    display: flex;
    flex-wrap: wrap;
    padding: 0 10px;
}
</style>