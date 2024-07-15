<template>
    <h1 class="userTitle">用户管理</h1>
    <el-table :data="userList" stripe style="width: 100%" size="large">
        <el-table-column prop="id" label="ID" width="100" />
        <el-table-column prop="username" label="用户" width="180" />
        <el-table-column prop="account" label="账号" width="180" />
        <el-table-column prop="sex" label="性别" width="100" align="center" />
        <el-table-column prop="role" label="角色" width="100" align="center" />
        <el-table-column prop="phone" label="手机号" width="200" align="center" />
        <el-table-column prop="email" label="邮箱" width="200" align="center" />
        <el-table-column prop="address" label="居住地" width="180" align="center" />
        <el-table-column prop="detailAddress" label="详细地址" width="300" align="center" />
        <el-table-column prop="createTime" label="创建时间" width="180" />
        <el-table-column prop="updateTime" label="更新时间" width="180" />

        <el-table-column fixed="right" label="操作" width="150">
            <template #default="{ row }">
                <el-button link type="primary" size="large" @click="resetPassword = true; rowInfo.value = row">
                    重置密码
                </el-button>
                <el-button link type="primary" size="large" @click="deleteUser = true; rowInfo.value = row;">
                    删除
                </el-button>

            </template>
        </el-table-column>

    </el-table>
    <el-dialog v-model="deleteUser" title="Tips" width="500" :before-close="handleClose">
        <span>你确定要删除这个用户吗</span>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="deleteUser = false">取消</el-button>
                <el-button type="primary" @click="doDeleteUser(rowInfo.value.id)">
                    确定
                </el-button>
            </div>
        </template>
    </el-dialog>

    <el-dialog v-model="resetPassword" title="Tips" width="500" :before-close="handleClose">
        <span>你确定要重置这个用户的密码吗</span>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="resetPassword = false">取消</el-button>
                <el-button type="primary" @click="doResetPassword(rowInfo.value.id)">
                    确定
                </el-button>
            </div>
        </template>
    </el-dialog>




    <!-- 分页条 -->
    <el-pagination v-model:current-page="pageData.pageNum" v-model:page-size="pageData.pageSize"
        :page-sizes="[5, 10, 15, 20]" size="small" background layout="sizes, prev, pager, next, jumper,total, "
        :total="pageData.total" @size-change="OnSizeChange" @current-change="OnCurrentChange" class="mt-4 page" />


</template>



<script setup>
import { ref } from "vue";
import { ElMessage } from 'element-plus';
import { getUserInfoOfPageAPI, deleteByIdAPI, resetPasswordAPI } from "@/api/user";
const userList = ref([])
const pageData = ref({
    pageNum: 1, //默认第一页
    pageSize: 5,    //每页五条数据
    total: 0,
    sortBy: "",
})
const rowInfo = ref({})

const deleteUser = ref(false)
const resetPassword = ref(false)

const getUserInfoList = () => {
    getUserInfoOfPageAPI(pageData.value).then(res => {
        // userList.value = res.data.list
        //当role为0时是管理员，否则为普通用户
        userList.value = res.data.list.map(item => ({
            ...item,
            role: item.role === 0 ? "管理员" : "普通用户"
        }))
        pageData.value.total = res.data.total

    })
}

getUserInfoList()

const OnCurrentChange = (pageNum) => {
    pageData.value.pageNum = pageNum
    getUserInfoList()
}

const OnSizeChange = (pageSize) => {
    pageData.value.pageSize = pageSize
    getUserInfoList()
}

const doDeleteUser = (id) => {
    deleteByIdAPI(id).then(res => {
        if (res.code === 1) {
            ElMessage.success('删除成功！')
            deleteUser.value = false
            getUserInfoList()
        } else {
            ElMessage.error("删除失败！")
        }
    })
}

//重置密码
const doResetPassword = (id) => {
    resetPasswordAPI(id).then(res => {
        if (res.code === 1) {
            ElMessage.success(res.msg)
            resetPassword.value = false
        }

    })
}


</script>

<style lang="scss">
.userTitle {
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