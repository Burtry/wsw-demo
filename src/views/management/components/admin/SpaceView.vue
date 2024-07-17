<template>


    <h1 class="spaceTitle">场地管理</h1>
    <el-button type="primary" class="btn" size="large" @click="addSpace = true">
        新增场地
    </el-button>
    <el-table :data="tableData" stripe style="width: 100%" size="large">
        <el-table-column prop="id" label="ID" width="100" />
        <el-table-column prop="spaceName" label="场地名称" width="180" />
        <el-table-column prop="spaceType" label="场地类型" width="180" />
        <el-table-column prop="status" label="场地状态" width="180" />
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
    <el-dialog v-model="addSpace" title="新增场地" width="500" :before-close="addSpaceClose">

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
            <!-- 图片 限制最多上传3张 -->
            <el-form-item label="场地图片" prop="img">
                <el-upload class="upload-demo" ref="upload" list-type="picture-card" action="" :limit="3"
                    :on-exceed="handleExceed" :on-preview="handlePictureCardPreview" :on-remove="handleRemove"
                    :http-request="uploadImage" v-model="spaceInfo.img">
                    <el-icon>
                        <Plus />
                    </el-icon>
                </el-upload>
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
                <el-button @click="addSpaceClose">取消</el-button>
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

    <!-- 分页条 -->
    <el-pagination v-model:current-page="pageData.pageNum" v-model:page-size="pageData.pageSize"
        :page-sizes="[5, 10, 15, 20]" size="small" background layout="sizes, prev, pager, next, jumper,total, "
        :total="pageData.total" @size-change="OnSizeChange" @current-change="OnCurrentChange" class="mt-4 page" />

    <el-upload class="upload-demo" ref="upload" list-type="picture-card" action=""
        :on-preview="handlePictureCardPreview" :http-request="uploadImage" :limit="3" :on-exceed="handleExceed"
        :on-remove="handleRemove">
        <el-icon>
            <Plus />
        </el-icon>
    </el-upload>
    <el-dialog v-model="imgDialogVisible">
        <img w-full :src="currentImageUrl" alt="Image" />
    </el-dialog>

</template>
<script setup>

import { uploadImageImgAPI } from "@/api/common.js";
const uploadImage = (params) => {
    uploadImageImgAPI(params.file).then((res) => {
        params.file.url = res.data

        // 将图片地址保存到 spaceInfo 对象中
        spaceInfo.value.img.push(res.data);
        console.log(spaceInfo.value.img);
        console.log(params.file.url);
        ElMessage({
            message: "上传成功",
            type: "success",
        });
    });

}
const upload = ref()
const imgDialogVisible = ref(false)
const currentImageUrl = ref('')
const handlePictureCardPreview = (file) => {
    currentImageUrl.value = file.url
    imgDialogVisible.value = true
}

const handleExceed = () => {
    ElMessage({
        message: '最多上传三张图片',
        type: 'warning',
    })
}

const handleRemove = (file) => {
    //移除该文件
    const index = spaceInfo.value.img.findIndex(img => img === file.raw.url);
    console.log(index);
    if (index !== -1) {
        spaceInfo.value.img.splice(index, 1);
    }
    console.log(spaceInfo.value.img);
    ElMessage({
        message: "图片已移除",
        type: "success",
    });
}


import { ref } from 'vue'
import { Plus } from '@element-plus/icons-vue'
import { getSpaceAPI, addSpaceAPI, deleteSpaceAPI, updateSpaceAPI, getSpaceByIdAPI } from "@/api/space.js";
import { ElMessage } from 'element-plus';
const dialogVisible = ref(false)
const dialogVisibleUpdate = ref(false)
const ruleFormRef = ref()
const tableData = ref([])
const addSpace = ref(false)
const rowInfo = ref({})
const updateInfo = ref({})
//分页数据模型
const pageData = ref({
    pageNum: 1, //默认第一页
    pageSize: 5,    //每页五条数据
    total: 0,
    sortBy: "",
})


const spaceInfo = ref({

    spaceName: '',
    spaceType: '',
    location: '',
    price: 0,
    description: '',
    img: [],
})
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

const addSpaceClose = () => {
    spaceInfo.value = {
        spaceName: '',
        spaceType: '',
        location: '',
        price: 0,
        description: '',
        img: [],
    }

    ruleFormRef.value.resetFields()
    upload.value.clearFiles()
    addSpace.value = false
}

const OnCurrentChange = (pageNum) => {
    pageData.value.pageNum = pageNum;

    getSpace();

}
const OnSizeChange = (pageSize) => {
    pageData.value.pageSize = pageSize;
    getSpace();
}
const getSpace = () => {
    getSpaceAPI(pageData.value).then(res => {
        tableData.value = res.data.list.map(item => ({
            ...item,
            price: item.price + "元/天",//将价格进行转换
            status: item.status === "1" ? "已预约" : "未预约"
        }));
        pageData.value.total = res.data.total;

    })
}
getSpace();

const doAddSpace = () => {
    //在校验通过后进行新增操作
    ruleFormRef.value.validate((valid) => {
        if (valid) {
            addSpaceAPI(spaceInfo.value).then(res => {
                ElMessage.success(res.msg)
                getSpace()
                addSpace.value = false
                //关闭后取消验证提示

                ruleFormRef.value.resetFields()

                upload.value.clearFiles()
            })
        } else {
            ElMessage.error('请输入完整信息')
        }
    })

}
const deleteSpace = (id) => {
    deleteSpaceAPI(id).then(res => {
        ElMessage.success(res.msg)
        getSpace()
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
                getSpace()
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
.spaceTitle {
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

.page {
    margin-top: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    // height: 100%;
}

.upload-demo {
    width: 400px;
    margin: 50px auto;
}
</style>