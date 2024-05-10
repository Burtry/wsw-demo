<script setup>


defineProps({
    goods: {
        type: Object,
        default: () => { }
    },
    category: {
        type: String,
        default: ''
    },
    id: {
        type: Number,
        default: 0
    }
})
</script>

<template>
    <RouterLink :to="`/${category}/${id}`" class="goods-item">
        <img :src="goods.picture" alt="" />
        <p class="name ellipsis">{{ goods.name }}</p>
        <p class="desc ellipsis">{{ goods.desc }}</p>
        <p class="price">{{ goods.price }}</p>
    </RouterLink>
</template>


<style scoped lang="scss">
.goods-item {
    display: block;
    width: 220px;
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