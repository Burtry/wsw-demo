<script setup>

defineProps({
    favorite: {
        type: Object,
        default: () => { }
    },
    id: {
        type: Number,
        default: 0
    },
    //分类
    category: {
        type: String,
        default: ''
    }
})

</script>

<template>
    <RouterLink :to="`/${category}/${id}`" class="favorites-item">
        <img :src="favorite.img[0]" alt="" />
        <p class="name ellipsis">{{ favorite.name }}</p>
        <p class="desc ellipsis">收藏时间{{ favorite.favoriteTime }}</p>
        <p>查看详情>>></p>
    </RouterLink>
</template>

<style scoped>
.favorites-item {
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
