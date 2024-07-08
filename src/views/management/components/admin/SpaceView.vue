<template>


    <h1 class="title">场地管理</h1>
    <el-button type="primary" class="btn" size="large" @click="addSpace = true">
        新增场地
    </el-button>


    <el-table :data="tableData" stripe style="width: 100%" size="large">
        <el-table-column prop="id" label="ID" width="100" />
        <el-table-column prop="spaceName" label="场地名称" width="180" />
        <el-table-column prop="spaceType" label="场地类型" width="180" />
        <el-table-column prop="location" label="场地位置" width="180" />
        <el-table-column prop="price" label="场地价格" width="100" align="center" />
        <el-table-column prop="description" label="场地描述" width="300" />
        <el-table-column prop="createTime" label="创建时间" width="180" />
        <el-table-column prop="updateTime" label="更新时间" width="180" />

        <el-table-column fixed="right" label="操作" width="120">
            <template #default="{ row }">
                <el-button link type="primary" size="large" @click="updateSpace(row.id)">
                    更改
                </el-button>
                <el-button link type="primary" size="large" @click="dialogVisible = true; rowInfo.value = row">
                    删除
                </el-button>
            </template>
        </el-table-column>



    </el-table>

    <el-dialog v-model="dialogVisible" title="Tips" width="500" :before-close="handleClose">
        <span>你确定要删除这个场地吗</span>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="dialogVisible = false">取消</el-button>
                <el-button type="primary" @click="dialogVisible = false; deleteSpace(rowInfo.value.id)">
                    确定
                </el-button>
            </div>
        </template>
    </el-dialog>

    <!-- 新增场地 -->
    <el-dialog v-model="addSpace" title="新增场地" width="500" :before-close="handleClose">

        <!-- 表单内容 -->

        <el-form ref="ruleFormRef" style="max-width: 600px" :model="spaceInfo" :rules="spaceRules" label-width="auto"
            class="demo-ruleForm" :size="formSize" status-icon>
            <el-form-item label="场地名称" prop="spaceName">
                <el-input v-model="spaceInfo.spaceName" />
            </el-form-item>
            <el-form-item label="场地类型" prop="spaceType">
                <el-input v-model="spaceInfo.spaceType" />
            </el-form-item>
            <el-form-item label="位置" prop="location">
                <el-input v-model="spaceInfo.location" />
            </el-form-item>
            <el-form-item label="价格" prop="price">
                <el-input v-model="spaceInfo.price" />
            </el-form-item>

            <el-form-item label="详细描述" prop="description">
                <el-input v-model="spaceInfo.description" />
            </el-form-item>


        </el-form>

        <template #footer>
            <div class="dialog-footer">
                <el-button @click="addSpace = false; spaceInfo = {}">取消</el-button>
                <el-button type="primary" @click="doAddSpace">
                    新增场地
                </el-button>
            </div>
        </template>
    </el-dialog>

    <!-- 更新场地 -->
    <el-dialog v-model="dialogVisibleUpdate" title="更新场地" width="500" :before-close="handleClose">

        <!-- 表单内容 -->

        <el-form ref="ruleFormRef" style="max-width: 600px" :model="updateInfo" :rules="spaceRules" label-width="auto"
            class="demo-ruleForm" :size="formSize" status-icon>
            <el-form-item label="场地名称" prop="spaceName">
                <el-input v-model="updateInfo.spaceName" />
            </el-form-item>
            <el-form-item label="场地类型" prop="spaceType">
                <el-input v-model="updateInfo.spaceType" />
            </el-form-item>
            <el-form-item label="位置" prop="location">
                <el-input v-model="updateInfo.location" />
            </el-form-item>
            <el-form-item label="价格" prop="price">
                <el-input v-model="updateInfo.price" />
            </el-form-item>

            <el-form-item label="详细描述" prop="description">
                <el-input v-model="updateInfo.description" />
            </el-form-item>


        </el-form>

        <template #footer>
            <div class="dialog-footer">
                <el-button @click="dialogVisibleUpdate = false; updateInfo = {}">取消</el-button>
                <el-button type="primary" @click="doUpdateSpace">
                    更新场地
                </el-button>
            </div>
        </template>
    </el-dialog>


</template>


<script setup>

import { ref } from 'vue'
import { getSpaceAPI, addSpaceAPI, deleteSpaceAPI, updateSpaceAPI, getSpaceByIdAPI } from "@/api/space.js";
import { ElMessage } from 'element-plus';
const dialogVisible = ref(false)
const dialogVisibleUpdate = ref(false)
const ruleFormRef = ref()
const tableData = ref([])
const addSpace = ref(false)
const rowInfo = ref({})
const updateInfo = ref({})
const spaceRules =
    ref({
        spaceName: [
            { required: true, message: '请输入场地名称', trigger: 'blur' },
        ],
        spaceType: [
            { required: true, message: '请输入场地类型', trigger: 'blur' },
        ],
        location: [
            { required: true, message: '请输入位置', rigger: 'blur' },
        ],
        //价格只能是数字

        price: [
            { required: true, message: '请输入价格', trigger: 'blur' },
            { pattern: /^[0-9]+(\.[0-9]{1,2})?$/, message: '请输入正确的价格', trigger: 'blur' },
        ],
        //详细描述
        description: [

            { required: false, message: '请输入详细描述', trigger: 'blur' },
        ]
    })
getSpaceAPI().then(res => {
    tableData.value = res.data
})
const spaceInfo = ref({

    spaceName: '',
    spaceType: '',
    location: '',
    price: 0,
    description: '',
})
const doAddSpace = () => {
    //在校验通过后进行新增操作
    ruleFormRef.value.validate((valid) => {
        if (valid) {
            addSpaceAPI(spaceInfo.value).then(res => {
                ElMessage.success(res.msg)
                getSpaceAPI().then(res => {
                    tableData.value = res.data
                })
                addSpace.value = false
                //关闭后取消验证提示

                ruleFormRef.value.resetFields()
                spaceInfo.value = {}
            })
        } else {
            ElMessage.error('请输入完整信息')
        }
    })

}
const deleteSpace = (id) => {
    deleteSpaceAPI(id).then(res => {
        ElMessage.success(res.msg)
        getSpaceAPI().then(res => {
            tableData.value = res.data
        })
    })
}
const updateSpace = (id) => {
    dialogVisibleUpdate.value = true
    getSpaceByIdAPI(id).then(res => {
        updateInfo.value = res.data
    })
}

const doUpdateSpace = () => {
    //在校验通过后进行新增操作
    ruleFormRef.value.validate((valid) => {
        if (valid) {

            updateSpaceAPI(updateInfo.value).then(res => {
                ElMessage.success(res.msg)
                getSpaceAPI().then(res => {
                    tableData.value = res.data
                })
                dialogVisibleUpdate.value = false
                updateInfo.value = {}
            })

        } else {
            ElMessage.error('请输入完整信息')
        }
    })
}

</script>

<style lang="scss">
.title {
    color: #606266;
    font-size: 34px;
    font-weight: bold;
    margin-bottom: -20px;
}

.btn {
    //按钮元素右对齐
    float: right;
    margin-top: -20px;
    margin-right: 20px;
    margin-bottom: 20px;
}
</style>