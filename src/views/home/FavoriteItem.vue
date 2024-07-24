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
    },
    cancel: {
        type: Function,
        default: () => {

        }
    }
})

</script>

<template>
    <div class="favorites-container">
        <RouterLink :to="`/${category}/${id}`" class="favorites-item">
            <img :src="favorite.img[0]" alt="" />
            <p class="name ellipsis">{{ favorite.name }}</p>
            <p class="desc ellipsis">收藏时间{{ favorite.favoriteTime }}</p>
        </RouterLink>
        <!-- 取消收藏的按钮 -->
        <div class="cancel-btn">
            <el-button type="info" plain @click="cancel">取消收藏</el-button>
        </div>
    </div>
</template>

<style scoped>
.favorites-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 310px;
    padding: 20px 30px;
    text-align: center;
    transition: all .5s;
}

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
}

.cancel-btn {
    margin-top: 10px;
}
</style>
