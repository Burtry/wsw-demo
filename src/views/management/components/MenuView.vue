<template>

    <!-- 管理员界面 -->
    <el-menu :default-active="currentRoute" class="el-menu-vertical-demo" router="true" v-if="false">
        <el-menu-item index="/management">
            <el-icon>
                <user />
            </el-icon>
            个人中心
        </el-menu-item>

        <el-menu-item index="/management/space">
            <el-icon>
                <Location />
            </el-icon>
            <span>场地管理</span>
        </el-menu-item>

        <el-menu-item index="/management/equipment">
            <el-icon>
                <Location />
            </el-icon>
            <span>器材管理</span>
        </el-menu-item>

        <el-menu-item index="/management/usermanagement">
            <el-icon>
                <user />
            </el-icon>
            <span>用户管理</span>
        </el-menu-item>
        <el-menu-item index="/management/systemmanagement">
            <el-icon>
                <setting />
            </el-icon>
            <span>系统管理</span>
        </el-menu-item>
        <div class="el-divider-admin"></div>
    </el-menu>



    <!-- 用户界面 -->
    <el-menu :default-active="currentRoute" class="el-menu-vertical-demo" router="true" v-else>
        <template #title>
            <el-icon>
                <IconMenu />
            </el-icon>
            <span>个人中心</span>
        </template>
        <el-menu-item index="/management/user">我的信息</el-menu-item>
        <el-menu-item index="/management/user/reservation">我的预约</el-menu-item>
        <el-menu-item index="/management/user/rental">我的租借</el-menu-item>
        <el-menu-item index="/management/user/favorite">我的收藏</el-menu-item>
        <div class="el-divider"></div>
    </el-menu>
</template>

<script setup>
import { useRoute } from 'vue-router';
const route = useRoute();
import {
    User,
    Menu as IconMenu,
    Location,
    Setting,
} from '@element-plus/icons-vue'
const currentRoute = route.path;


</script>

<style>
.el-divider {
    height: 595px;
}

.el-divider-admin {
    height: 540px;
}
</style>