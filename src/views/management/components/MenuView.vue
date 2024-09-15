<template>

    <!-- 管理员界面 -->
    <el-menu :default-active="currentRoute" class="el-menu-vertical-demo" router="true" v-if=isAdmin>
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

        <el-menu-item index="/management/reserve">
            <el-icon>
                <Location />
            </el-icon>
            <span>预约管理</span>
        </el-menu-item>

        <el-menu-item index="/management/rental">
            <el-icon>
                <Location />
            </el-icon>
            <span>租借管理</span>
        </el-menu-item>


        <el-menu-item index="/management/usermanagement">
            <el-icon>
                <user />
            </el-icon>
            <span>用户管理</span>
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
        <el-menu-item index="/management">我的信息</el-menu-item>
        <el-menu-item index="/management/user/reservation">我的预约</el-menu-item>
        <el-menu-item index="/management/user/rental">我的租借</el-menu-item>
        <el-menu-item index="/management/user/favorite">我的收藏</el-menu-item>
        <div class="el-divider"></div>
    </el-menu>
</template>

<script setup>
import { useRoute } from 'vue-router';
import { useUserStore } from '@/stores/user';
const userStore = useUserStore()
import { ref } from "vue";
const route = useRoute();
import {
    User,
    Menu as IconMenu,
    Location,
    Setting,
} from '@element-plus/icons-vue'
const currentRoute = route.path;

const isAdmin = ref(false)
userStore.userInfo.role === 0 ?
    isAdmin.value = true :
    isAdmin.value = false


</script>

<style>
.el-divider {
    height: 595px;
}

.el-divider-admin {
    height: 428px;
}
</style>