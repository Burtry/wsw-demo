<script setup>
import { ref } from 'vue'
import { getEquipmentByIdAPI } from "@/api/equipment.js";
import { useRoute } from "vue-router"
import { useUserStore } from "@/stores/user.js";
import { ElMessage } from 'element-plus'
import { addUserRentalAPI } from "@/api/rental.js";
const userStore = useUserStore();

const userInfo = ref({})
userInfo.value = userStore.userInfo


const route = useRoute();
const equipmentId = route.params.id;
const equipment = ref({});
const stringImg = ref("")
getEquipmentByIdAPI(equipmentId).then((res) => {

    const data = res.data;
    stringImg.value = data.img
    // 处理 img 字符串，将其转为数组
    if (data.img) {
        data.img = data.img.slice(1, -1).split(',').map(url => url.trim());
    }
    equipment.value = {
        ...data,
        rentalPrice: data.rentalPrice + "元/天"
    };
}).catch(error => {
    console.error('获取器材数据时出错:', error);
});

const dialogVisible = ref(false)
const form = ref({})
const rentalInfo = ref({
    userId: userInfo.value.id,
    equipmentId: equipmentId,
    startTime: '',
    endTime: '',
    rentalStatus: 0,
    remark: '',
})

const handOpen = () => {
    dialogVisible.value = true
}

const handleClose = () => {
    dialogVisible.value = false
    rentalInfo.value = {
        userId: userInfo.value.id,
        equipmentId: equipmentId,
        startTime: '',
        endTime: '',
        rentalStatus: 0,
        remark: '',
    }
    //清空表单
    form.value = {}

}

const rentalEquipment = () => {
    if (!form.value.rentalDateTime) {
        ElMessage.error('请选择租借时间')
        return
    }
    rentalInfo.value.startTime = form.value.rentalDateTime[0]
    rentalInfo.value.endTime = form.value.rentalDateTime[1]
    rentalInfo.value.remark = form.value.remark;
    addUserRentalAPI(rentalInfo.value).then(res => {
        if (res.code === 1) {
            ElMessage.success('租借成功')
            handleClose()
        } else {
            if (res.data.code === -1) {
                // 预约时间冲突 + 开始时间 - 结束时间
                ElMessage({
                    message: "租借时间冲突, 已有租借：" + res.data.startTime + " - " + res.data.endTime,
                    type: "error",
                    duration: 5000, // 显示时间（毫秒），此处为 5 秒
                    showClose: true, // 显示关闭按钮
                });
                // 关闭对话框
                handleClose();
            }
            handleClose();
        }
    }).catch(error => {
        ElMessage.error('租借失败:', error);
        handleClose()
    })
}

import { addFavoriteAPI } from "@/api/favorite.js";

const favoriteInfo = ref({})
const addFavorite = () => {
    //填写favoriteInfo
    favoriteInfo.value.userId = userInfo.value.id;
    favoriteInfo.value.favoriteType = 2;//收藏类型 1-场地 ,2-器材
    favoriteInfo.value.name = equipment.value.equipmentName;
    favoriteInfo.value.img = stringImg.value;
    favoriteInfo.value.favoriteId = equipment.value.id;
    favoriteInfo.value.type = equipment.value.equipmentType;
    favoriteInfo.value.description = equipment.value.description;
    //发送收藏请求
    addFavoriteAPI(favoriteInfo.value).then((res) => {
        if (res.code === 0) {
            ElMessage.warning('已收藏');
        }
        if (res.code === 1) {
            ElMessage.success('收藏成功');
        }
    }).catch(error => {
        ElMessage.error('收藏失败');
        console.log(error);
    });
}

</script>

<template>
    <div class="detail">
        <div class="container">
            <div class="info-container">
                <div>
                    <div class="info">
                        <div class="media">
                            <!-- 图片预览区 -->
                            <el-carousel arrow="always" height="400px">
                                <el-carousel-item v-for="item in equipment.img" :key="item.id">
                                    <img :src="item" alt="" class="s-img">
                                </el-carousel-item>
                            </el-carousel>
                        </div>
                        <div class="detail">
                            <p class="name">器材名: {{ equipment.equipmentName }} </p>
                            <p class="desc">详细描述: {{ equipment.description }} </p>
                            <p class="type">
                                器材类型: {{ equipment.equipmentType }}
                            </p>
                            <div class="price">
                                租借价格: <span>{{ equipment.rentalPrice }}</span>
                            </div>
                            <p class="status">
                                <!-- TODO显示使用时间 -->
                                当前器材状态：<span v-if="equipment.status === '1'" class="use">已被租借</span>
                                <span v-else class="free">未使用</span>
                            </p>
                            <!-- 按钮组件 -->
                            <div>
                                <el-button size="large" class="detail-btn" @click="handOpen">
                                    立即预约
                                </el-button>
                                <el-button size="large" class="detail-btn" @click="addFavorite">
                                    收藏
                                </el-button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- 预约时间选择 -->
    <el-dialog title="租借信息" v-model="dialogVisible" width="30%" :before-close="handleClose" draggable>

        <el-form ref="formRef" :model="form" label-width="auto" class="demo-ruleForm">
            <el-form-item label="租借时间" prop="rentalDateTime" :rules="[
                                    { required: true, message: '请选择预约时间' }]">
                <el-date-picker v-model="form.rentalDateTime" type="datetimerange" start-placeholder="选择开始时间"
                    end-placeholder="选择结束时间" format="YYYY-MM-DD hh:mm:ss" value-format="YYYY-MM-DD hh:mm:ss" />
            </el-form-item>
            <el-form-item label="备注" prop="rentalRemark">
                <el-input v-model="form.remark" type="textarea" />
            </el-form-item>
        </el-form>

        <!-- 用户信息 -->
        <el-descriptions title="用户信息" column="2">
            <el-descriptions-item label="用户名">{{ userInfo.username }}</el-descriptions-item>
            <el-descriptions-item label="性别">{{ userInfo.sex }}</el-descriptions-item>
            <el-descriptions-item label="手机号">{{ userInfo.phone }}</el-descriptions-item>
            <el-descriptions-item label="邮箱"> {{ userInfo.email }}</el-descriptions-item>
        </el-descriptions>
        <!-- 预约信息 -->
        <el-descriptions title="预约信息" column="2">
            <el-descriptions-item label="场地名">{{ equipment.equipmentName }}</el-descriptions-item>
            <el-descriptions-item label="场地类型">{{ equipment.equipmentType }}</el-descriptions-item>
            <el-descriptions-item label="预约价格"> {{ equipment.rentalPrice }}</el-descriptions-item>
        </el-descriptions>
        <!-- 收款码 -->
        <el-descriptions title="收款码" column="2">

            <el-descriptions-item label="">
                <img src="@/assets/images/erweima.jpg" alt="" style="width: 200px; height: 200px;">
            </el-descriptions-item>
        </el-descriptions>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="handleClose">取 消</el-button>
                <el-button type="primary" @click="rentalEquipment">确 定</el-button>
            </span>
        </template>

    </el-dialog>
</template>


<style scoped lang='scss'>
.detail {
    .info {
        min-height: 620px;
        background: #fff;
        display: flex;

        .media {
            width: 560px;
            height: 600px;
            padding: 30px 50px;
        }

    }
}

.detail {
    flex: 1;
    padding: 30px 30px 30px 0;

    .name {
        font-size: 22px;
        padding-bottom: 10px;
        margin-top: 10px;
    }

    .desc {
        font-size: 20px;
        color: #999;
        line-height: 30px;
        padding-bottom: 10px;
        border-bottom: #999 solid 1px;
    }

    .type {
        font-size: 20px;
        line-height: 30px;
        padding-bottom: 10px;
        margin-top: 20px;
    }


    .price {
        font-size: 20px;
        line-height: 30px;


        span {
            font-size: 24px;
            color: #f40;
        }
    }

    .status {
        font-size: 20px;
        line-height: 30px;
        padding-bottom: 10px;

        .use {
            color: #f40;
        }

        .free {
            color: #999;
        }
    }
}


.s-img {
    width: 100%;
    height: 400px;
}



.detail-btn {
    margin-top: 20px;
}
</style>