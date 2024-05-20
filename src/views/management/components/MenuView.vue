<template>

    <!-- 管理员界面 -->
    <el-menu default-active="2" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" router="true"
        v-if="false">


        <el-menu-item index="/management/user">
            <el-icon>
                <user />
            </el-icon>
            个人中心
        </el-menu-item>


        <el-sub-menu index="2">
            <template #title>
                <el-icon>
                    <location />
                </el-icon>
                <span>场地管理</span>
            </template>
            <el-menu-item-group>
                <el-menu-item index="/management/place/type">场地类型管理</el-menu-item>
                <el-menu-item index="/management/place/info">场地信息管理</el-menu-item>
                <el-menu-item index="/management/place/reserve">场地预约管理</el-menu-item>
                <el-menu-item index="/management/place/evaluate">场地评价管理</el-menu-item>
            </el-menu-item-group>
        </el-sub-menu>
        <el-sub-menu index="3">
            <template #title>
                <el-icon>
                    <location />
                </el-icon>
                <span>租借管理</span>
            </template>
            <el-menu-item-group>
                <el-menu-item index="/management/equipment/type">租借类型管理</el-menu-item>
                <el-menu-item index="/management/equipment/info">器材信息管理</el-menu-item>
                <el-menu-item index="/management/equipment/reserve">器材租借管理</el-menu-item>
                <el-menu-item index="/management/equipment/evaluate">器材评价管理</el-menu-item>
            </el-menu-item-group>
        </el-sub-menu>

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
    </el-menu>



    <!-- 用户界面 -->
    <el-menu default-active="2" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" router="true"
        v-else>
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
    </el-menu>
</template>

<script setup>
import {
    User,
    Menu as IconMenu,
    Location,
    Setting,
} from '@element-plus/icons-vue'

</script>

<style></style>