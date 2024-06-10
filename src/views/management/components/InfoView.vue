<template>
    <div class="info-view">
        <div class="avatar">
            <el-avatar :icon="UserFilled" size="large" />
        </div>

        <el-descriptions class="margin-top" title="我的信息" :column="2" size="large" border>
            <template #extra>
                <el-button type="primary">修改信息</el-button>
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

        <div class="like-container">
            <div class="home-panel">
                <div class="header">
                    <h4 data-v-bcb266e0="">猜你喜欢</h4>
                </div>
                <div class="goods-list">
                    <GoodsItem v-for="item in equipmentList" :key="item.id" :goods="item" :category="'equipment'"
                        :id="item.id">
                    </GoodsItem>
                </div>
            </div>
        </div>

    </div>
</template>

<script setup>
import { ref, computed } from 'vue';

import { UserFilled } from '@element-plus/icons-vue'
import {
    Iphone,
    Location,
    OfficeBuilding,
    Tickets,
    User,
} from '@element-plus/icons-vue'
import { useUserStore } from "@/stores/user.js";
import GoodsItem from '@/views/home/GoodsItem.vue'

const userStore = useUserStore();
const userRole = computed(() => {
    return userStore.userInfo.role === 0 ? '管理员' : '普通用户';
});


const equipmentList = ref([
    {
        id: '1',
        name: '器材',
        picture: '404.png'
    },
    {
        id: '2',
        name: '器材',
        picture: '404.png'
    },
    {
        id: '3',
        name: '器材',
        picture: '404.png'
    },
    {
        id: '4',
        name: '器材',
        picture: '404.png'
    },
])

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
