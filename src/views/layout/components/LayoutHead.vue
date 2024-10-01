<script setup>
import { Search } from '@element-plus/icons-vue'
import { ref } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();

const searchInput = ref("")
// 定义搜索按钮的点击事件处理函数
const handleSearch = async () => {
    if (!searchInput.value.trim()) {
        return; // 如果输入为空，则不发起搜索请求
    }
    // 调用搜索 API
    try {
        // 路由跳转，传递查询参数
        router.push({ path: '/search', query: { searchInput: searchInput.value } });

        // 在请求完成后清空搜索框
        searchInput.value = "";
    } catch (error) {
        console.error("搜索失败", error);
    }
}


</script>

<template>
    <header class='app-header'>
        <div class="container">
            <h1 class="logo">
                <RouterLink to="/">万事屋</RouterLink>
            </h1>
            <ul class="app-header-nav">
                <li class="home">
                    <RouterLink :to="`/space`" active-class="active">场地预约</RouterLink>
                </li>
                <li class="home">
                    <RouterLink :to="`/equipment`" active-class="active">器材租借</RouterLink>
                </li>
                <li class="home">
                    <RouterLink :to="'/management'" active-class="active">后台管理</RouterLink>
                </li>
            </ul>
            <el-input v-model="searchInput" @keydown.enter="handleSearch" style="width: 240px" placeholder="请输入" />
            <el-button @click="handleSearch">
                <el-icon style="vertical-align: middle">
                    <Search />
                </el-icon>
                <span style="vertical-align: middle"> 搜索 </span>
            </el-button>
        </div>

    </header>
</template>


<style scoped lang='scss'>
.active {
    color: #069;
    border-bottom: 1px solid #069;
}

.app-header {
    background: #fff;

    .container {
        display: flex;
        align-items: center;
    }

    .logo {
        width: 200px;

        a {
            display: block;
            display: block;
            height: 132px;
            width: 100%;
            text-indent: -9999px;
            margin-top: -40px;
            background: url('@/assets/images/logo.png') no-repeat center 55px / contain;
        }

    }

    .app-header-nav {
        width: 820px;
        display: flex;
        padding-left: 40px;
        position: relative;
        z-index: 998;

        li {
            margin-right: 40px;
            width: 80px;
            text-align: center;

            a {
                font-size: 16px;
                line-height: 32px;
                height: 32px;
                display: inline-block;

                &:hover {
                    color: #069;
                    border-bottom: 1px solid #069;
                }
            }

            .active {
                color: #069;
                border-bottom: 1px solid #069;
            }
        }
    }


    .cart {
        width: 50px;

        .curr {
            height: 32px;
            line-height: 32px;
            text-align: center;
            position: relative;
            display: block;

            .icon-cart {
                font-size: 22px;
            }

            em {
                font-style: normal;
                position: absolute;
                right: 0;
                top: 0;
                padding: 1px 6px;
                line-height: 1;
                background: #e26237;
                color: #fff;
                font-size: 12px;
                border-radius: 10px;
                font-family: Arial;
            }
        }
    }
}
</style>