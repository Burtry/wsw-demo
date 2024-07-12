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
        <img :src="rental.name" alt="" />
        <p class="name ellipsis">{{ rental.EquipmentName }}</p>
        <!-- 开始-结束时间 -->
        <p class="desc ellipsis">开始时间:{{ rental.startTime }}</p>
        <p class="desc ellipsis">结束时间:{{ rental.endTime }}</p>
        <p class="price">{{ rental.status }}</p>
        <p>点击查看详情</p>
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
}
</style>