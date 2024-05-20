<template>
    <div class="common-layout">
        <el-container>
            <el-aside width="200px">
                <MenuView />
            </el-aside>
            <el-main>
                <RouterView />
            </el-main>
        </el-container>
    </div>
</template>
<script setup>
import MenuView from './components/MenuView.vue'

</script>