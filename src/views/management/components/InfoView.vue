<template>
    <div class="info-view">
        <div class="avatar">
            <el-avatar :icon="UserFilled" size="large" />
        </div>

        <el-descriptions class="margin-top" title="我的信息" :column="2" size="large" border>
            <template #extra>
                <el-button type="primary" @click="doEdit = true">修改信息</el-button>
            </template>
            <el-descriptions-item>
                <template #label>
                    <div class="cell-item">
                        <el-icon :style="iconStyle">
                            <user />
                        </el-icon>
                        用户名
                    </div>
                </template>
                {{ userStore.userInfo.username }}
            </el-descriptions-item>
            <el-descriptions-item>
                <template #label>
                    <div class="cell-item">
                        <el-icon :style="iconStyle">
                            <user />
                        </el-icon>
                        账号
                    </div>
                </template>
                {{ userStore.userInfo.account }}
            </el-descriptions-item>
            <el-descriptions-item>
                <template #label>
                    <div class="cell-item">
                        <el-icon :style="iconStyle">
                            <office-building />
                        </el-icon>
                        性别
                    </div>
                </template>
                {{ userStore.userInfo.sex }}
            </el-descriptions-item>
            <el-descriptions-item>
                <template #label>
                    <div class="cell-item">
                        <el-icon :style="iconStyle">
                            <office-building />
                        </el-icon>
                        邮箱
                    </div>
                </template>
                {{ userStore.userInfo.email }}
            </el-descriptions-item>
            <el-descriptions-item>
                <template #label>
                    <div class="cell-item">
                        <el-icon :style="iconStyle">
                            <iphone />
                        </el-icon>
                        手机号
                    </div>
                </template>
                {{ userStore.userInfo.phone }}
            </el-descriptions-item>
            <el-descriptions-item>
                <template #label>
                    <div class="cell-item">
                        <el-icon :style="iconStyle">
                            <location />
                        </el-icon>
                        居住地
                    </div>
                </template>
                {{ userStore.userInfo.address }}
            </el-descriptions-item>
            <el-descriptions-item>
                <template #label>
                    <div class="cell-item">
                        <el-icon :style="iconStyle">
                            <tickets />
                        </el-icon>
                        Role(角色)
                    </div>
                </template>
                <el-tag size="small">{{ userRole }}</el-tag>
            </el-descriptions-item>
            <el-descriptions-item>
                <template #label>
                    <div class="cell-item">
                        <el-icon :style="iconStyle">
                            <office-building />
                        </el-icon>
                        地址
                    </div>
                </template>
                {{ userStore.userInfo.detailAddress }}
            </el-descriptions-item>

        </el-descriptions>

        <!-- 修改信息 -->
        <el-dialog v-model="doEdit" title="修改信息" width="500" :before-close="handleClose">

            <!-- 表单内容 -->

            <el-form ref="ruleFormRef" style="max-width: 600px" :model="newUserInfoForm" :rules="userInfoRules"
                label-width="auto" class="demo-ruleForm" :size="formSize" status-icon>
                <el-form-item label="用户名(昵称)" prop="username">
                    <el-input v-model="newUserInfoForm.username" />
                </el-form-item>
                <el-form-item label="性别">
                    <el-radio-group v-model="newUserInfoForm.sex" size="large" class="ml-4">
                        <el-radio value="男" size="large">男</el-radio>
                        <el-radio value="女" size="large">女</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="手机号" prop="phone">
                    <el-input v-model="newUserInfoForm.phone" />
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                    <el-input v-model="newUserInfoForm.email" />
                </el-form-item>
                <el-form-item label="现居地" prop="address">
                    <el-input v-model="newUserInfoForm.address" />
                </el-form-item>
                <el-form-item label="详细地址" prop="detailAddress">
                    <el-input v-model="newUserInfoForm.detailAddress" />
                </el-form-item>


            </el-form>

            <template #footer>
                <div class="dialog-footer">
                    <el-button @click="doRegister = false; registerForm = {}">取消</el-button>
                    <el-button type="primary" @click="updateUserInfo">
                        修改
                    </el-button>
                </div>
            </template>
        </el-dialog>


        <div class="like-container">
            <div class="home-panel">
                <div class="header">
                    <h4 data-v-bcb266e0="">猜你喜欢</h4>
                </div>
                <div class="goods-list">
                    <EquipmentItem v-for="item in list" :key="item.id" :equipments="item" :id="item.id">
                    </EquipmentItem>
                </div>
            </div>
        </div>

    </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import EquipmentItem from '@/views/home/EquipmentItem.vue'
import { UserFilled } from '@element-plus/icons-vue'
import {
    Iphone,
    Location,
    OfficeBuilding,
    Tickets,
    User,
} from '@element-plus/icons-vue'

import { useUserStore } from "@/stores/user.js";
// import SpaceItem from '@/views/home/SpaceItem.vue'
import { updateUserInfoAPI } from '@/api/user.js'
import { ElMessage } from 'element-plus';
import { verifyIdentityAPI } from "@/api/user.js";
import { getAllEquipmentAPI } from "@/api/equipment.js"
const list = ref([])
const equipmentList = ref([])
getAllEquipmentAPI().then(res => {
    equipmentList.value = res.data.map(equipment => {
        return {
            ...equipment,
            img: equipment.img ? equipment.img.slice(1, -1).split(',') : [],
            rentalPrice: equipment.rentalPrice + "元/天"
        }
    })

    list.value = equipmentList.value.slice(0, 4)
})



const userStore = useUserStore();
const userRole = computed(() => {
    return userStore.userInfo.role === 0 ? '管理员' : '普通用户';
});

const userId = computed(() => {
    return userStore.userInfo.id;
});

verifyIdentityAPI(userId.value)

const doEdit = ref(false)
const ruleFormRef = ref()

const newUserInfoForm = ref({
    id: userStore.userInfo.id,
    username: '',
    sex: '',
    phone: '',
    email: '',
    address: '',
    detailAddress: ''
})

const userInfoRules = {
    username: [
        { required: true, message: '请输入用户名', trigger: 'blur' },
    ],
    phone: [
        { required: true, message: '请输入手机号', trigger: 'blur' },
        { min: 11, max: 11, message: '手机号长度为11位', trigger: 'blur' },
    ],
    email: [
        { required: true, message: '请输入邮箱', trigger: 'blur' },
        { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] },
    ],
    address: [
        { required: true, message: '请输入地址', trigger: 'blur' },
    ],
    detailAddress: [
        { required: true, message: '请输入详细地址', trigger: 'blur' },
    ],

}

const updateUserInfo = async () => {
    // 表单校验
    ruleFormRef.value.validate((valid) => {
        if (!valid) {
            ElMessage({ type: 'error', message: '请填写正确的信息' })
            return
        }

        updateUserInfoAPI(newUserInfoForm.value).then(res => {
            if (res.code === 1) {
                ElMessage({ type: 'success', message: '修改成功' })
                //将用户新的信息直接存储到Store中
                userStore.userInfo.username = newUserInfoForm.value.username;
                userStore.userInfo.sex = newUserInfoForm.value.sex;
                userStore.userInfo.phone = newUserInfoForm.value.phone;
                userStore.userInfo.email = newUserInfoForm.value.email;
                userStore.userInfo.address = newUserInfoForm.value.address;
                userStore.userInfo.detailAddress = newUserInfoForm.value.detailAddress;

                //将表单内容置空
                newUserInfoForm.value = {}
                //修改成功后，关闭修改信息弹窗
                doEdit.value = false;
            } else {
                ElMessage({ type: 'error', message: '修改失败' })
            }
        });
    });



}

</script>

<style scoped>
.info-view {
    width: 100%;
    height: 800px;
    display: flex;
    flex-direction: column;
    background-color: #ffffff;
    padding: 20px;
}

.el-descriptions {
    margin-top: 20px;
}


.avatar {
    float: right;
    margin-right: 50px;
}

.like-container {
    margin-top: 20px;
    border-radius: 4px;
    background-color: #fff;
}

.home-panel {
    background-color: #fff;
    padding: 0 20px;
    margin-top: 20px;
    height: 400px;

    .header {
        height: 66px;
        border-bottom: 1px solid #f5f5f5;
        padding: 18px 0;
        display: flex;
        justify-content: space-between;
        align-items: baseline;

        h4 {
            font-size: 22px;
            font-weight: 400;
        }

    }

    .goods-list {
        display: flex;
        justify-content: space-around;
    }
}
</style>
