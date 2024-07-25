<template>
    <h1 class="reserveTitle">场地预约记录管理</h1>

    <el-table :data="reserveList" stripe style="width: 100%" size="large">
        <el-table-column prop="id" label="预约ID" width="100" />
        <el-table-column prop="userId" label="用户ID" width="100" />
        <el-table-column prop="spaceId" label="场地ID" width="100" />
        <el-table-column prop="startTime" label="开始时间" width="180" align="center" />
        <el-table-column prop="endTime" label="结束时间" width="180" align="center" />
        <el-table-column prop="reservationStatus" label="预约状态" width="100" align="center" />
        <el-table-column prop="remark" label="备注" width="200" align="center" />
        <el-table-column prop="createTime" label="创建时间" width="180" />
        <el-table-column prop="updateTime" label="更新时间" width="180" />

        <el-table-column fixed="right" label="操作" width="250">
            <template #default="{ row }">
                <el-button link type="primary" size="large" @click="updateStatus = true; rowId = row.id">
                    修改状态
                </el-button>
                <el-button link type="primary" size="large"
                    @click="updateReserve = true; rowInfo.value = row; updateInfo.id = row.id">
                    修改信息
                </el-button>
                <el-button link type="primary" size="large" @click="deleteReserve = true; rowInfo.value = row;">
                    删除
                </el-button>

            </template>
        </el-table-column>

    </el-table>

    <!-- 分页条 -->
    <el-pagination v-model:current-page="pageData.pageNum" v-model:page-size="pageData.pageSize"
        :page-sizes="[5, 10, 15, 20]" size="small" background layout="sizes, prev, pager, next, jumper,total, "
        :total="pageData.total" @size-change="OnSizeChange" @current-change="OnCurrentChange" class="mt-4 page" />

    <!-- 删除预约记录 -->
    <el-dialog v-model="deleteReserve" title="Tips" width="500" :before-close="handleClose">
        <span>你确定要删除吗</span>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="deleteReserve = false">取消</el-button>
                <el-button type="primary" @click="doDeleteReserve(rowInfo.value.id)">
                    确定
                </el-button>
            </div>
        </template>
    </el-dialog>

    <!-- 修改状态 -->
    <el-dialog v-model="updateStatus" title="修改租借状态" width="500" :before-close="updateStatusClose">
        <el-form :model="updateStatusInfo" class="demo-form-inline">
            <el-form-item label="租借状态">
                <el-select v-model="updateStatusInfo.reservationStatus">
                    <el-option label="已取消" value="0" />
                    <el-option label="已预约" value="1" />
                    <el-option label="进行中" value="2" />
                    <el-option label="已完成" value="3" />
                </el-select>
            </el-form-item>
        </el-form>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="updateStatusClose">取消</el-button>
                <el-button type="primary" @click="doUpdateStatus">
                    确定
                </el-button>
            </div>
        </template>
    </el-dialog>

    <!-- 修改预约信息 -->
    <el-dialog v-model="updateReserve" title="修改预约信息" width="500" :before-close="updateDialogClose">

        <!-- 表单内容 -->

        <el-form ref="ruleFormRef" style="max-width: 600px" :model="updateInfo" label-width="auto" class="demo-ruleForm"
            :size="formSize" status-icon>
            <el-form-item label="新的场地ID" prop="spaceId">
                <el-input v-model="updateInfo.spaceId" />
            </el-form-item>
            <el-form-item label="新的用户ID" prop="spaceId">
                <el-input v-model="updateInfo.userId" />
            </el-form-item>
            <el-form-item label="新的开始时间">
                <el-date-picker v-model="updateInfo.startTime" type="datetime" format="YYYY-MM-DD hh:mm:ss"
                    value-format="YYYY-MM-DD hh:mm:ss" placeholder="请选择日期和时间" />
            </el-form-item>
            <el-form-item label="新的结束时间">
                <el-date-picker v-model="updateInfo.endTime" type="datetime" format="YYYY-MM-DD hh:mm:ss"
                    value-format="YYYY-MM-DD hh:mm:ss" placeholder="请选择日期和时间" />
            </el-form-item>
            <el-form-item label="预约状态">
                <el-select v-model="updateInfo.reservationStatus">
                    <el-option label="已取消" value="0" />
                    <el-option label="已预约" value="1" />
                    <el-option label="进行中" value="2" />
                    <el-option label="已完成" value="3" />
                </el-select>
            </el-form-item>
            <el-form-item label="备注" prop="description">
                <el-input v-model="updateInfo.remark" />
            </el-form-item>


        </el-form>

        <template #footer>
            <div class="dialog-footer">
                <el-button @click="updateDialogClose">取消</el-button>
                <el-button type="primary" @click="doUpdateReserve">
                    修改预约
                </el-button>
            </div>
        </template>
    </el-dialog>

</template>

<script setup>
import { ref } from "vue";
import { getReserveListOfPageAPI, deleteReserveByIdAPI, updateReserveAPI, updateReservationStatusAPI } from "@/api/reserve.js";
import { ElMessage } from "element-plus";
// import dayjs from "dayjs";
const reserveList = ref([]);
const deleteReserve = ref(false)
const updateReserve = ref(false)
const rowInfo = ref({})
const rowId = ref({})
const updateStatus = ref(false)
const updateStatusInfo = ref({
    reservationStatus: ""
})

const updateStatusClose = () => {
    updateStatus.value = false
    updateStatusInfo.value = {}
}

const doUpdateStatus = () => {
    updateReservationStatusAPI(rowId.value, updateStatusInfo.value.reservationStatus).then(res => {
        if (res.code === 1) {
            ElMessage({
                message: "修改成功",
                type: "success"
            })
            getReserveListOfPage()

        } else {
            ElMessage({
                message: "修改失败",
                type: "error"
            })
        }
        updateStatus.value = false
    })

}

const updateInfo = ref({})
const pageData = ref({
    pageNum: 1,
    pageSize: 10,
    total: 0,
    sortBy: ""

})

const updateDialogClose = () => {
    updateReserve.value = false
    updateInfo.value = {}
}


const getReserveListOfPage = () => {
    getReserveListOfPageAPI(pageData.value).then(res => {
        reserveList.value = res.data.list.map(item => ({
            ...item,
            reservationStatus: item.reservationStatus === 1 ? "已预约" : item.reservationStatus === 2 ? "进行中" : item.reservationStatus === 3 ? "已完成" : "已取消"
        }))
        pageData.value.total = res.data.total;
    })
}

getReserveListOfPage()

const doDeleteReserve = (id) => {
    deleteReserveByIdAPI(id).then(res => {
        if (res.code === 1) {

            ElMessage({
                message: "删除成功",
                type: "success"
            })
            getReserveListOfPage()
            deleteReserve.value = false
        } else {

            ElMessage({
                message: "删除失败",
                type: "error"

            })
        }
    })
}

const OnCurrentChange = (pageNum) => {
    pageData.value.pageNum = pageNum
    getReserveListOfPage()
}

const OnSizeChange = (pageSize) => {
    pageData.value.pageSize = pageSize
    getReserveListOfPage()
}

const doUpdateReserve = () => {
    updateReserveAPI(updateInfo.value).then(res => {
        if (res.code === 1) {
            ElMessage({
                message: "修改成功",
                type: "success"
            })
            getReserveListOfPage()
            updateReserve.value = false
            updateInfo.value = {}

        } else {
            ElMessage({
                message: "修改失败",
                type: "error"
            })
        }
    })
}
</script>



<style>
.reserveTitle {
    color: #606266;
    font-size: 34px;
    font-weight: bold;
    margin-bottom: 20px;
}

.page {
    margin-top: 20px;
    display: flex;
    justify-content: center;
    align-items: center;

}
</style>