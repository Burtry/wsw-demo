<script setup>

defineProps({
    title: {
        type: String,
        default: ''
    },
    subTitle: {
        type: String,
        default: ''
    },
    category: {
        type: String,
        default: ''
    }
})

</script>


<template>
    <div class="home-panel">
        <div class="container">
            <div class="head">
                <!-- 主标题和副标题 -->
                <h3>
                    {{ title }}<small>{{ subTitle }}</small>
                </h3>
                <RouterLink :to="`/${category}`" class="more">查看更多>>></RouterLink>
            </div>
            <!-- 主体内容区域 -->
            <slot name="main"></slot>
        </div>
    </div>
</template>

<style scoped lang='scss'>
h3 {
    // 左对齐
    text-align: left;
}

.more {
    &:hover {
        color: #27ba9b;
    }
}

.home-panel {
    background-color: #fff;

    .head {
        padding: 20px 0;
        display: flex;
        align-items: flex-end;

        h3 {
            flex: 1;
            font-size: 32px;
            font-weight: normal;
            margin-left: 6px;
            height: 35px;
            line-height: 35px;

            small {
                font-size: 16px;
                color: #999;
                margin-left: 20px;
            }
        }
    }
}
</style>