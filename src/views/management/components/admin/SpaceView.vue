<template>

    <div class="space-manage">
        <h1>场地管理</h1>
        <el-button type="primary" size="large" @click="handleClick">
            新增场地
        </el-button>
    </div>

    <el-table :data="tableData" stripe style="width: 100%" size="large">
        <el-table-column prop="id" label="ID" width="100" />
        <el-table-column prop="name" label="场地名称" width="180" />
        <el-table-column prop="type" label="场地类型" width="180" />
        <el-table-column prop="location" label="场地位置" width="180" />
        <el-table-column prop="price" label="场地价格" width="100" align="center" />
        <el-table-column prop="description" label="场地描述" width="300" />
        <el-table-column prop="createTime" label="创建时间" width="180" />
        <el-table-column prop="updateTime" label="更新时间" width="180" />
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
        name: 'Tom',
        type: '滑雪场',
        location: 'No. 189, Grove St, Los Angeles',
        price: '160',
        description: '这是滑雪场，滑雪场滑雪场',
        createTime: '2023-04-01 12:00:00',
        updateTime: '2023-04-01 12:00:00'
    },
    {
        id: '2',
        name: 'Tom',
        type: '溜冰场',
        location: 'No. 189, Grove St, Los Angeles',
        price: '160',
        description: '这是溜冰场，溜冰场溜冰场',
        createTime: '2023-04-01 12:00:00',
        updateTime: '2023-04-01 12:00:00'
    },
    {
        id: '1',
        name: 'Tom',
        type: '滑雪场',
        location: 'No. 189, Grove St, Los Angeles',
        price: '160',
        description: '这是滑雪场，滑雪场滑雪场',
        createTime: '2023-04-01 12:00:00',
        updateTime: '2023-04-01 12:00:00'
    },
    {
        id: '2',
        name: 'Tom',
        type: '溜冰场',
        location: 'No. 189, Grove St, Los Angeles',
        price: '160',
        description: '这是溜冰场，溜冰场溜冰场这是溜冰场，溜冰场溜冰场这是溜冰场，溜冰场溜冰场这是溜冰场，溜冰场溜冰场这是溜冰场，溜冰场溜冰场',
        createTime: '2023-04-01 12:00:00',
        updateTime: '2023-04-01 12:00:00'
    },
    {
        id: '1',
        name: 'Tom',
        type: '滑雪场',
        location: 'No. 189, Grove St, Los Angeles',
        price: '160',
        description: '这是滑雪场，滑雪场滑雪场',
        createTime: '2023-04-01 12:00:00',
        updateTime: '2023-04-01 12:00:00'
    },
    {
        id: '2',
        name: 'Tom',
        type: '溜冰场',
        location: 'No. 189, Grove St, Los Angeles',
        price: '160',
        description: '这是溜冰场，溜冰场溜冰场',
        createTime: '2023-04-01 12:00:00',
        updateTime: '2023-04-01 12:00:00'
    }
]
</script>

<style lang="scss">
.space-manage {
    background-color: #fff;

}

.space-manage h1 {
    font-size: 30px;
    color: #606266;
}
</style>