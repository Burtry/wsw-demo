<script setup>
import { ref } from 'vue'
import { getSpaceByIdAPI } from "@/api/space.js";
import { useRoute } from "vue-router";
import { useUserStore } from "@/stores/user.js";
import { ElMessage } from 'element-plus';

const userStore = useUserStore();
const userInfo = ref({})
userInfo.value = userStore.userInfo;

const route = useRoute();
const spaceId = route.params.id;
const space = ref({});
const stringImg = ref("")
const getSpaceById = () => {
    getSpaceByIdAPI(spaceId).then((res) => {

        const data = res.data;
        stringImg.value = data.img
        // 处理 img 字符串，将其转为数组
        if (data.img) {
            data.img = data.img.slice(1, -1).split(',').map(url => url.trim());
        }
        space.value = {
            ...data,
            price: data.price + "元/天"
        };
    }).catch(error => {
        console.error('获取场地数据时出错:', error);
    });
}

getSpaceById();

/**预约信息处理 */
const dialogVisible = ref(false);
const form = ref({})
const reserveInfo = ref({
    userId: userInfo.value.id,
    spaceId: spaceId,
    startTime: '',
    endTime: '',
    reservationStatus: 0, //未预约状态
    remark: '',
})
const handleOpen = () => {
    //封装预约信息reserveInfo
    // 打开对话框
    dialogVisible.value = true;
}

const handleClose = () => {
    dialogVisible.value = false;
    reserveInfo.value =
    {
        userId: userInfo.value.id,
        spaceId: spaceId,
        startTime: '',
        endTime: '',
        reservationStatus: 0, //未预约状态
        remark: '',
    }
    //清空表单
    form.value = {}
}

import { addReserveAPI } from "@/api/reserve.js";
const reserveSpace = () => {
    // 验证表单
    if (!form.value.reserveDateTime) {
        ElMessage.error('请选择预约时间');
        return;
    }
    //预约信息添加
    reserveInfo.value.startTime = form.value.reserveDateTime[0];
    reserveInfo.value.endTime = form.value.reserveDateTime[1];
    reserveInfo.value.remark = form.value.remark;
    // 发送预约请求
    addReserveAPI(reserveInfo.value).then((res) => {
        if (res.code === 1) {
            ElMessage.success('预约成功');
            getSpaceById()
            // 关闭对话框
            handleClose();
        } else {
            if (res.data.code === -1) {
                // 预约时间冲突 + 开始时间 - 结束时间
                ElMessage({
                    message: "预约时间冲突, 已有预约：" + res.data.startTime + " - " + res.data.endTime,
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
        console.error('预约失败:', error);
    });
}

import { addFavoriteAPI } from "@/api/favorite.js";

const favoriteInfo = ref({})
const addFavorite = () => {
    //填写favoriteInfo
    favoriteInfo.value.userId = userInfo.value.id;
    favoriteInfo.value.favoriteType = 1;//收藏类型 1-场地 ,2-器材
    favoriteInfo.value.name = space.value.spaceName;
    favoriteInfo.value.img = stringImg.value;
    favoriteInfo.value.favoriteId = space.value.id;
    favoriteInfo.value.type = space.value.spaceType;
    favoriteInfo.value.description = space.value.description;
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
                                <el-carousel-item v-for="item in space.img" :key="item.id">
                                    <img :src="item" alt="" class="s-img">
                                </el-carousel-item>
                            </el-carousel>
                        </div>
                        <div class="detail">
                            <p class="name">场地名: {{ space.spaceName }} </p>
                            <p class="desc">详细描述: {{ space.description }} </p>
                            <p class="type">
                                场地类型: {{ space.spaceType }}
                            </p>
                            <p class="location">场地位置: {{ space.location }}</p>
                            <div class="price">
                                预约价格: <span>{{ space.price }}</span>
                            </div>
                            <p class="status">
                                <!-- TODO显示使用时间 -->
                                当前场地状态：<span v-if="space.status === '1'" class="use">使用中</span>
                                <span v-else class="free">未使用</span>
                            </p>



                            <!-- 按钮组件 -->
                            <div>
                                <el-button size="large" class="detail-btn" @click="handleOpen">
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
    <el-dialog title="预约信息" v-model="dialogVisible" width="30%" :before-close="handleClose" draggable>

        <el-form ref="formRef" :model="form" label-width="auto" class="demo-ruleForm">
            <el-form-item label="预约时间" prop="reserveDateTime" :rules="[
                                    { required: true, message: '请选择预约时间' }]">
                <el-date-picker v-model="form.reserveDateTime" type="datetimerange" start-placeholder="选择开始时间"
                    end-placeholder="选择结束时间" format="YYYY-MM-DD hh:mm:ss" value-format="YYYY-MM-DD hh:mm:ss" />
            </el-form-item>
            <el-form-item label="备注" prop="reserveRemark">
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
            <el-descriptions-item label="场地名">{{ space.spaceName }}</el-descriptions-item>
            <el-descriptions-item label="场地类型">{{ space.spaceType }}</el-descriptions-item>
            <el-descriptions-item label="场地位置">{{ space.location }}</el-descriptions-item>
            <el-descriptions-item label="预约价格"> {{ space.price }}</el-descriptions-item>
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
                <el-button type="primary" @click="reserveSpace">确 定</el-button>
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

    .location {
        font-size: 20px;
        line-height: 30px;
        padding-bottom: 10px;
    }

    .price {
        font-size: 20px;
        line-height: 30px;
        padding-bottom: 10px;

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