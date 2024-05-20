<script setup>
import { useScroll } from '@vueuse/core'
const { y } = useScroll(window)



</script>

<template>
    <div class="app-header-sticky" :class="{ show: y > 78 }">
        <div class="container">
            <RouterLink class="logo" to="/" />
            <!-- <h1>123</h1> -->
            <!-- 导航区域 -->
            <ul class="app-header-nav">
                <li class="home">
                    <RouterLink :to="`/space`" active-class="active">场地预约</RouterLink>
                </li>
                <li class="home">
                    <RouterLink :to="`/equipment`" active-class="active">器材租借</RouterLink>
                </li>
                <li class="home">
                    <RouterLink :to="`/advertise`" active-class="active">公告资讯</RouterLink>
                </li>
                <li class="home">
                    <RouterLink :to="`/assess`" active-class="active">用户评价</RouterLink>
                </li>
                <li class="home">
                    <RouterLink :to="`/management`" active-class="active">后台管理</RouterLink>
                </li>
            </ul>

            <div class="right">
                <RouterLink to="/">Burtry</RouterLink>

                <RouterLink to="/">收藏</RouterLink>
            </div>
        </div>
    </div>
</template>


<style scoped lang='scss'>
.app-header-sticky {
    width: 100%;
    height: 80px;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 999;
    background-color: #fff;
    border-bottom: 1px solid #e4e4e4;
    // 此处为关键样式!!!
    // 状态一：往上平移自身高度 + 完全透明
    transform: translateY(-100%);
    opacity: 0;

    // 状态二：移除平移 + 完全不透明
    &.show {
        transition: all 0.3s linear;
        transform: none;
        opacity: 1;
    }

    .container {
        display: flex;
        align-items: center;
    }

    .logo {
        width: 200px;
        height: 80px;
        background: url("@/assets/images/logo.png") no-repeat center 15px;
        background-size: 160px auto;
    }

    .right {
        width: 220px;
        display: flex;
        text-align: center;
        padding-left: 40px;
        border-left: 2px solid #069;

        a {
            width: 38px;
            margin-right: 40px;
            font-size: 16px;
            line-height: 1;

            &:hover {
                color: #069;
            }
        }
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
</style>