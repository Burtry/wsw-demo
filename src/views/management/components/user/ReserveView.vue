<template>
    <div>
        <el-radio-group v-model="radio" @change="radioChange">
            <el-radio :value="-1">全部</el-radio>
            <el-radio :value="2">进行中</el-radio>
            <el-radio :value="1">已预约</el-radio>
            <el-radio :value="3">已完成</el-radio>
            <el-radio :value="0">已取消</el-radio>
        </el-radio-group>
    </div>
    <div class="reserveList">
        <ReserveItem v-for="item in reservationsList" :key="item.id" :reserve="item" @click="openReservation(item)" />
    </div>


    <!-- 预约详细信息 -->
    <el-dialog title="预约信息" v-model="dialogVisible" width="30%" :before-close="handleClose" draggable>

        <!-- 用户信息 -->
        <el-descriptions title="用户信息" column="1">
            <el-descriptions-item label="用户名">{{ reservationDetail.username }}</el-descriptions-item>
            <el-descriptions-item label="手机号">{{ reservationDetail.phone }}</el-descriptions-item>
            <el-descriptions-item label="邮箱"> {{ reservationDetail.email }}</el-descriptions-item>
        </el-descriptions>
        <!-- 预约信息 -->
        <el-descriptions title="预约信息" column="1">
            <el-descriptions-item label="场地名">{{ reservationDetail.spaceName }}</el-descriptions-item>
            <el-descriptions-item label="场地类型">{{ reservationDetail.spaceType }}</el-descriptions-item>
            <el-descriptions-item label="场地位置">{{ reservationDetail.location }}</el-descriptions-item>
            <el-descriptions-item label="开始时间">{{ reservationDetail.startTime }}</el-descriptions-item>
            <el-descriptions-item label="结束时间">{{ reservationDetail.endTime }}</el-descriptions-item>
            <el-descriptions-item label="备注">{{ reservationDetail.remark }}</el-descriptions-item>

        </el-descriptions>



    </el-dialog>



</template>


<script setup>
import ReserveItem from '@/views/home/ReserveItem.vue'
import { getReserveTextAPI } from "@/api/reserve.js";
import { ref } from 'vue';

const dialogVisible = ref(false)
const reservationDetail = ref({})
const handleClose = () => {
    dialogVisible.value = false
}
const openReservation = (item) => {
    reservationDetail.value = item
    dialogVisible.value = true

}

const radio = ref(-1)
const radioChange = (value) => {
    radio.value = value
    getReserveText()

}
const reservationsList = ref([])
const getReserveText = () => {
    getReserveTextAPI(radio.value).then(res => {
        reservationsList.value = res.data.map(space => {
            return {
                ...space,
                img: space.img ? space.img.slice(1, -1).split(',') : [],
            }
        })
    })
}
getReserveText()



</script>

<style>
.reserveList {
    display: flex;
    flex-wrap: wrap;
    padding: 0 10px;
}
</style>