<script setup>


defineProps({
    reserve: {
        type: Object,
        default: () => { }
    }
})
</script>

<template>
    <RouterLink :to="``" class="reserve-item">
        <img :src="reserve.img[0]" alt="" />
        <p class="name ellipsis">{{ reserve.spaceName }}</p>
        <!-- 开始-结束时间 -->
        <p class="desc ellipsis">开始时间:{{ reserve.startTime }}</p>
        <p class="desc ellipsis">结束时间:{{ reserve.endTime }}</p>
        <p class="price">{{ reserve.reservationStatus === 1 ? "已预约" : reserve.reservationStatus === 2 ?
            "进行中" : reserve.reservationStatus === 3 ? "已完成" : "已取消" }}</p>
        <p class="remark">备注:{{ reserve.remark }}</p>
    </RouterLink>
</template>


<style scoped lang="scss">
.reserve-item {
    display: block;
    width: 310px;
    padding: 20px 30px;
    text-align: center;
    transition: all .5s;

    &:hover {
        transform: translate3d(0, -3px, 0);
        box-shadow: 0 3px 8px rgb(0 0 0 / 20%);
    }

    img {
        width: 160px;
        height: 160px;
    }

    p {
        padding-top: 10px;
    }

    .name {
        font-size: 16px;
    }

    .desc {
        color: #999;
        height: 29px;
    }

    .price {
        color: #cf4444;
        font-size: 20px;
    }

    .remark {
        color: #999;
        font-size: 14px;
        // 左对齐
    }
}
</style>