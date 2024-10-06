<script setup>
defineProps({
    searchList: {
        type: Object,
        default: () => { }
    },
    id: {
        type: Number,
        default: 0
    },
    type: {
        type: String,
        default: ''
    }
})
</script>

<template>
    <RouterLink :to="`/${type}/${id}`" class="search-item">
        <img :src="searchList.url" alt="" />
        <!-- <img :src="equipments.img[0]" alt="" />    -->
        <p class="name ellipsis" v-html="searchList.name"></p>
        <p class="price">{{ searchList.price }}</p>
        <p>查看详情>>></p>
    </RouterLink>
</template>


<style lang="scss">
.search-item {
    display: block;
    width: 250px;
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

        em {
            color: red;
            font-style: normal;
            /* 取消 <em> 标签的斜体效果 */
        }
    }

    .location {
        color: #999;
        height: 29px;
    }

    .price {
        color: #cf4444;
        font-size: 20px;
    }
}
</style>