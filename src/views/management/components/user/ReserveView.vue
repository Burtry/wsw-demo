<template>

    <el-table :data="tableData" stripe style="width: 100%" size="large">
        <el-table-column prop="id" label="预约ID" width="100" />
        <el-table-column prop="spaceId" label="场地ID" width="100" />
        <el-table-column prop="name" label="场地名称" width="180" />
        <el-table-column prop="type" label="场地类型" width="180" />
        <el-table-column prop="location" label="场地位置" width="180" />
        <el-table-column prop="price" label="场地价格" width="100" align="center" />
        <el-table-column prop="createTime" label="开始时间" width="180" />
        <el-table-column prop="updateTime" label="结束时间" width="180" />
        <el-table-column prop="description" label="场地描述" width="300" />

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
        spaceId: '1',
        name: '场地1',
        type: '场地类型1',
        location: '位置1',
        price: '100',
        createTime: '2023-04-12 12:00:00',
        updateTime: '2023-04-12 12:00:00',
        description: '场地描述场地描述场地描述场地描述场地描述场地描述场地描述'
    },
    {
        id: '2',
        spaceId: '2',
        name: '场地2',
        type: '场地类型2',
        location: '位置2',
        price: '200',
        createTime: '2023-04-12 12:00:00',
        updateTime: '2023-04-12 12:00:00',
    }
]
</script>

<style></style>