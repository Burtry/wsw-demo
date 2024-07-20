<template>


    <h1 class="EquipmentTitle">器材管理</h1>
    <el-button type="primary" class="btn" size="large" @click="addEquipment = true">
        新增器材
    </el-button>


    <el-table :data="equipmentList" stripe style="width: 100%" size="large">
        <el-table-column prop="id" label="ID" width="100" />
        <el-table-column prop="equipmentName" label="器材名称" width="180" />
        <el-table-column prop="equipmentType" label="器材类型" width="180" />
        <el-table-column prop="rentalPrice" label="租借价格" width="100" align="center" />
        <el-table-column prop="status" label="器材状态" width="180" />
        <el-table-column prop="description" label="器材描述" width="300" />
        <el-table-column prop="createTime" label="创建时间" width="180" />
        <el-table-column prop="updateTime" label="更新时间" width="180" />

        <el-table-column fixed="right" label="操作" width="180">
            <template #default="{ row }">
                <el-button link type="primary" size="large" @click="getEquipmentInfo(row.id)">
                    详情/更改
                </el-button>
                <el-button link type="primary" size="large" @click="deleteEquipment = true; rowInfo.value = row">
                    删除
                </el-button>
            </template>
        </el-table-column>
    </el-table>

    <!-- 删除器材 -->
    <el-dialog v-model="deleteEquipment" title="Tips" width="500">
        <span>你确定要删除这个场地吗</span>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="deleteEquipment = false">取消</el-button>
                <el-button type="primary" @click="doDeleteEquipment(rowInfo.value.id)">
                    确定
                </el-button>
            </div>
        </template>
    </el-dialog>

    <!-- 新增器材 -->
    <el-dialog v-model="addEquipment" title="新增器材" width="500" :before-close="addEquipmentClose">

        <!-- 表单内容 -->

        <el-form ref="ruleFormRef" style="max-width: 600px" :model="equipmentInfo" :rules="equipmentRules"
            label-width="auto" class="demo-ruleForm" :size="formSize" status-icon>
            <el-form-item label="器材名称" prop="equipmentName">
                <el-input v-model="equipmentInfo.equipmentName" />
            </el-form-item>
            <el-form-item label="器材类型" prop="EquipmentType">
                <el-input v-model="equipmentInfo.equipmentType" />
            </el-form-item>

            <el-form-item label="器材图片" prop="img" v-loading="loading">
                <!-- 图片 限制最多上传3张 -->
                <el-upload class="upload-demo" ref="upload" list-type="picture-card" action="" :limit="3"
                    :on-exceed="handleExceed" :on-preview="handlePictureCardPreview" :on-remove="handleRemove"
                    :http-request="uploadImage" v-model="equipmentInfo.img">
                    <el-icon>
                        <Plus />
                    </el-icon>
                </el-upload>
            </el-form-item>
            <el-form-item label="租借价格" prop="rentalPrice">
                <el-input v-model="equipmentInfo.rentalPrice" />
            </el-form-item>

            <el-form-item label="详细描述" prop="description">
                <el-input v-model="equipmentInfo.description" />
            </el-form-item>


        </el-form>

        <template #footer>
            <div class="dialog-footer">
                <el-button @click="addEquipmentClose">取消</el-button>
                <el-button type="primary" @click="doAddEquipment">
                    新增器材
                </el-button>
            </div>
        </template>
    </el-dialog>

    <!-- 更新器材 -->
    <el-dialog v-model="updateEquipment" title="更新场地" width="500" :before-close="handleClose">

        <!-- 表单内容 -->

        <el-form ref="ruleFormRef" style="max-width: 600px" :model="updateInfo" :rules="EquipmentRules"
            label-width="auto" class="demo-ruleForm" :size="formSize" status-icon>
            <el-form-item label="器材名称" prop="equipmentName">
                <el-input v-model="updateInfo.equipmentName" />
            </el-form-item>
            <el-form-item label="器材类型" prop="equipmentType">
                <el-input v-model="updateInfo.equipmentType" />
            </el-form-item>

            <el-form-item label="场地图片" prop="img" v-loading="loading">

                <el-upload class="upload-demo" ref="upload" action="" list-type="picture-card" :limit="3"
                    :on-exceed="handleExceed" :file-list="fileListUpdate" :on-preview="handlePictureCardPreviewUpdate"
                    :on-remove="handleRemoveUpdate" :http-request="uploadImageUpdate" v-model="updateInfo.img">
                    <i class="el-icon-plus"></i>
                    <el-icon>
                        <Plus />
                    </el-icon>
                </el-upload>
            </el-form-item>
            <el-form-item label="价格" prop="rentalPrice">
                <el-input v-model="updateInfo.rentalPrice" />
            </el-form-item>

            <el-form-item label="详细描述" prop="description">
                <el-input v-model="updateInfo.description" />
            </el-form-item>


        </el-form>

        <template #footer>
            <div class="dialog-footer">
                <el-button @click="handleClose">取消</el-button>
                <el-button type="primary" @click="doUpdateEquipment">
                    更新器材
                </el-button>
            </div>
        </template>
    </el-dialog>

    <el-dialog v-model="imgDialogVisible">
        <img w-full :src="currentImageUrl" alt="Image" />
    </el-dialog>


    <!-- 分页条 -->
    <el-pagination v-model:current-page="pageData.pageNum" v-model:page-size="pageData.pageSize"
        :page-sizes="[5, 10, 15, 20]" size="small" background layout="sizes, prev, pager, next, jumper,total, "
        :total="pageData.total" @size-change="OnSizeChange" @current-change="OnCurrentChange" class="mt-4 page" />


</template>
<script setup>

const loading = ref(false)
import { uploadImageImgAPI } from "@/api/common";
import { Plus } from "@element-plus/icons-vue"
const upload = ref()
const currentImageUrl = ref('')
const imgDialogVisible = ref(false)
const fileListUpdate = ref([])
const uploadImage = (params) => {
    loading.value = true
    uploadImageImgAPI(params.file).then(res => {
        equipmentInfo.value.img.push(res.data)
        ElMessage.success("上传成功")
    })
    loading.value = false
}

const uploadImageUpdate = (params) => {
    loading.value = true
    uploadImageImgAPI(params.file).then((res) => {
        params.file.url = res.data
        // 将图片地址保存到 updateInfo 对象中
        fileListUpdate.value.push({
            url: res.data,
            uid: params.file.uid,
            status: 'success'
        });
        ElMessage({
            message: "上传成功",
            type: "success",
        });
        loading.value = false

    });
}

const handleClose = () => {

    updateEquipment.value = false
    updateInfo.value = {
        equipmentName: "",
        equipmentType: "",
        img: [],
        rentalPrice: "",
        status: "0",
        description: "",
    }
}

const handlePictureCardPreviewUpdate = (file) => {
    currentImageUrl.value = file.url
    imgDialogVisible.value = true
}

const handleRemoveUpdate = (file) => {

    const index = fileListUpdate.value.findIndex(item => item.uid === file.uid);
    if (index !== -1) {
        fileListUpdate.value.splice(index, 1);
    }
}

const handleExceed = () => {
    ElMessage({
        message: '最多上传三张图片',
        type: 'warning',
    })
}


const handlePictureCardPreview = (file) => {
    currentImageUrl.value = file.url
    imgDialogVisible.value = true
}

const handleRemove = (file) => {
    //移除该文件
    const index = equipmentInfo.value.img.findIndex(img => img === file.raw.url);
    console.log(index);
    if (index !== -1) {
        equipmentInfo.value.img.splice(index, 1);
    }
    console.log(equipmentInfo.value.img);
    ElMessage({
        message: "图片已移除",
        type: "success",
    });
}

import { getEquipmentAPI, addEquipmentAPI, deleteEquipmentAPI, updateEquipmentAPI, getEquipmentByIdAPI } from "@/api/equipment";
import { ref } from "vue";
import { ElMessage } from "element-plus";
const addEquipment = ref(false);
const deleteEquipment = ref(false);
const updateEquipment = ref(false);
const rowInfo = ref({})
const equipmentInfo = ref({

    equipmentName: "",
    equipmentType: "",
    img: [],
    rentalPrice: "",
    //默认未租借
    status: "0",
    description: "",

})

//分页数据模型
const pageData = ref({
    pageNum: 1, //默认第一页
    pageSize: 5,    //每页十条数据
    total: 0,
    sortBy: "",
})
const updateInfo = ref({})

const ruleFormRef = ref()
const equipmentRules = ref({

    equipmentName: [
        { required: true, message: '请输入器材名称', trigger: 'blur' },
    ],
    equipmentType: [
        { required: true, message: '请输入器材类型', trigger: 'blur' },
    ],
    rentalPrice: [
        { required: true, message: '请输入器材价格', trigger: 'blur' },
        //只能为数字
        { pattern: /^\d+(\.\d{1,2})?$/, message: '请输入正确的价格', trigger: 'blur' },
    ],

    status: [
        { required: true, message: '请选择器材状态', trigger: 'blur' },
    ],

    description: [
        { required: true, message: '请输入器材描述', trigger: 'blur' },
    ]
})

const addEquipmentClose = () => {

    equipmentInfo.value = {
        equipmentName: '',
        equipmentType: '',
        rentalPrice: '',
        //默认未租借
        status: "0",
        description: '',
        img: []
    }

    ruleFormRef.value.resetFields()
    upload.value.clearFiles()
    addEquipment.value = false;
}

const OnCurrentChange = (pageNum) => {
    pageData.value.pageNum = pageNum;
    getEquipment();
}
const OnSizeChange = (pageSize) => {
    pageData.value.pageSize = pageSize;
    getEquipment();
}


const equipmentList = ref([]);
const getEquipment = () => {
    getEquipmentAPI(pageData.value).then(res => {
        equipmentList.value = res.data.list.map(item => ({
            ...item,
            status: item.status === "1" ? "已租借" : "未租借",//将状态进行转换
            rentalPrice: item.rentalPrice + "元/天",//将价格进行转换
        }));
        pageData.value.total = res.data.total;
    });
}
getEquipment();

//新增器材
const doAddEquipment = () => {

    ruleFormRef.value.validate((valid) => {
        if (valid) {
            addEquipmentAPI(equipmentInfo.value).then(res => {
                if (res.code === 1) {
                    ElMessage.success("新增成功!")
                    getEquipment();

                    equipmentInfo.value = {
                        equipmentName: '',
                        equipmentType: '',
                        rentalPrice: '',
                        //默认未租借
                        status: "0",
                        description: '',
                        img: []
                    }
                    addEquipment.value = false;
                    //关闭后取消验证提示

                    ruleFormRef.value.resetFields()

                    upload.value.clearFiles()
                } else {
                    ElMessage.error("新增失败!")
                }
            })
        }
    })
}

//删除器材
const doDeleteEquipment = (id) => {
    deleteEquipmentAPI(id).then(res => {
        if (res.code === 1) {
            ElMessage.success("删除成功!");
            deleteEquipment.value = false;
            getEquipment()
        } else {
            ElMessage.error("删除失败!");
        }
    })
}

const getEquipmentInfo = (id) => {
    getEquipmentByIdAPI(id).then(res => {
        updateInfo.value = res.data;
        if (typeof res.data === 'object') {
            updateInfo.value = res.data;
            // 将 img 字段从字符串转换为数组
            if (typeof updateInfo.value.img === 'string') {
                updateInfo.value.img = updateInfo.value.img
                    .replace(/^\[|\]$/g, '')  // 去掉开头和结尾的方括号
                    .split(',')               // 按逗号分割
                    .map(url => url.trim());  // 去掉多余的空格
                fileListUpdate.value = formatImgList(updateInfo.value.img);
            } else {
                updateInfo.value.img = [];
                fileListUpdate.value = [];
            }
        } else {
            console.error('API 返回的数据格式不正确');
        }
        updateEquipment.value = true;
    })
}

// 将字符串数组转换为文件列表格式
const formatImgList = (imgArray) => {
    return imgArray.map((img, index) => ({
        name: `Image ${index + 1}`,
        url: img,
        uid: Date.now() + index,  // 生成唯一的uid
        status: 'success'
    }));
};
//更新器材
const doUpdateEquipment = () => {

    updateInfo.value.img = fileListUpdate.value

    //将数组的img转换成字符串的img
    updateInfo.value.img = '[' + updateInfo.value.img.map(item => item.url).join(',') + ']';


    updateEquipmentAPI(updateInfo.value).then(res => {

        if (res.code === 1) {
            ElMessage.success("更新成功!")
            updateEquipment.value = false;
            getEquipment();
        } else {
            ElMessage.error("更新失败!")
        }
    })
}


</script>

<style lang="scss">
.EquipmentTitle {
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
</style>