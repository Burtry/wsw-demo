<template>
    <div>
        <el-radio-group v-model="radio" @change="radioChange">
            <el-radio :value="-1">全部</el-radio>
            <el-radio :value="2">进行中</el-radio>
            <el-radio :value="1">已租借</el-radio>
            <el-radio :value="3">未归还</el-radio>
            <el-radio :value="4">已归还</el-radio>
            <el-radio :value="0">已取消</el-radio>
        </el-radio-group>
    </div>
    <div class="rentalList">
        <RentalItem v-for="item in rentalList" :key="item.id" :rental="item" @click="openRental(item)" />
    </div>

    <!-- 租借详细信息 -->
    <el-dialog title="预约信息" v-model="dialogVisible" width="30%" :before-close="handleClose" draggable>

        <!-- 用户信息 -->
        <el-descriptions title="用户信息" column="1">
            <el-descriptions-item label="用户名">{{ reservationDetail.username }}</el-descriptions-item>
            <el-descriptions-item label="手机号">{{ reservationDetail.phone }}</el-descriptions-item>
            <el-descriptions-item label="邮箱"> {{ reservationDetail.email }}</el-descriptions-item>
        </el-descriptions>
        <!-- 预约信息 -->
        <el-descriptions title="预约信息" column="1">
            <el-descriptions-item label="器材名称">{{ reservationDetail.equipmentName }}</el-descriptions-item>
            <el-descriptions-item label="器材类型">{{ reservationDetail.equipmentType }}</el-descriptions-item>
            <el-descriptions-item label="开始时间">{{ reservationDetail.startTime }}</el-descriptions-item>
            <el-descriptions-item label="结束时间">{{ reservationDetail.endTime }}</el-descriptions-item>
            <el-descriptions-item label="备注">{{ reservationDetail.remark }}</el-descriptions-item>

        </el-descriptions>



    </el-dialog>
</template>


<script setup>

import RentalItem from "@/views/home/RentalItem.vue"
import { ref } from "vue";
import { getUserRentalAPI } from "@/api/rental.js";
const rentalList = ref([])
const radio = ref(-1)
const dialogVisible = ref(false)
const reservationDetail = ref({})
const handleClose = () => {
    dialogVisible.value = false
}
const openRental = (item) => {
    reservationDetail.value = item
    dialogVisible.value = true
}

const radioChange = (value) => {
    radio.value = value
    getUserRental()
}
const getUserRental = () => {
    getUserRentalAPI(radio.value).then((res) => {
        rentalList.value = res.data.map(equipment => {
            return {
                ...equipment,
                img: equipment.img ? equipment.img.slice(1, -1).split(",") : []
            }
        })
    })
}

getUserRental()
</script>

<style>
.rentalList {
    display: flex;
    flex-wrap: wrap;
    padding: 0 10px;
}
</style>