<template>
    <el-table :data="tableData" stripe style="width: 100%" size="large" height="250">
        <el-table-column prop="id" label="租借ID" width="100" />
        <el-table-column prop="equipmentId" label="器材ID" width="100" />
        <el-table-column prop="name" label="器材名称" width="180" />
        <el-table-column prop="type" label="器材类型" width="180" />
        <el-table-column prop="price" label="租借价格" width="100" align="center" />
        <el-table-column prop="createTime" label="开始时间" width="180" />
        <el-table-column prop="updateTime" label="结束时间" width="180" />
        <el-table-column prop="description" label="器材描述" width="300" />

        <el-table-column fixed="right" label="操作" width="120">
            <template #default>
                <el-button link type="primary" size="large" @click="handleClick">
                    更改
                </el-button>
                <el-button link type="primary" size="large">删除</el-button>
            </template>
        </el-table-column>


    </el-table>
</template>


<script setup>
const tableData = [
    {
        id: '1',
        equipmentId: '1',
        name: '器材1',
        type: '器材类型1',
        price: '10',
        createTime: '2023-04-18 12:00:00',
        updateTime: '2023-04-18 12:00:00',
        description: '器材描述器材描述器材描述器材描述器材描述器材描述'
    },
    {
        id: '2',
        equipmentId: '2',
        name: '器材2',
        type: '器材类型2',
        price: '20',
        createTime: '2023-04-18 12:00:00',
        updateTime: '2023-04-18 12:00:00',
        description: '器材描述2'
    },
    {
        id: '3',
        equipmentId: '3',
        name: '器材3',
        type: '器材类型3',
        price: '30',
        createTime: '2023-04-18 12:00:00',
        updateTime: '2023-04-18 12:00:00',
        description: '器材描述3'
    }
]
</script>

<style></style>