<script setup>


defineProps({
    rental: {
        type: Object,
        default: () => { }
    }
})
</script>

<template>
    <RouterLink :to="``" class="rental-item">
        <img :src="rental.img[0]" alt="" />
        <p class="name ellipsis">{{ rental.equipmentName }}</p>
        <!-- 开始-结束时间 -->
        <p class="desc ellipsis">开始时间:{{ rental.startTime }}</p>
        <p class="desc ellipsis">结束时间:{{ rental.endTime }}</p>
        <p class="price">{{ rental.rentalStatus === 1 ? '已租借' : rental.rentalStatus === 2 ? '进行中' : rentalStatus === 3
        ? " 未归还" : rental.rentalStatus === 4 ? "已归还" : "已取消" }}</p>
        <p class="remark">备注: {{ rental.remark }}</p>
    </RouterLink>
</template>


<style scoped lang="scss">
.rental-item {
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
    }
}
</style>