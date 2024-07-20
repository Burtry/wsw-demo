<script setup>
import HomePanel from '../HomePanel.vue'
import { ref } from 'vue'

import { getAllSpaceAPI } from "@/api/space.js";
const spaceList = ref([])
const limitSpaceList = ref([])
getAllSpaceAPI().then(res => {
    spaceList.value = res.data.map(space => {
        return {
            ...space,
            img: space.img ? space.img.slice(1, -1).split(',') : [],
            price: space.price + "元/天"
        }
    })

    limitSpaceList.value = spaceList.value.slice(0, 4) //只取前4个展示
})

</script>
<template>
    <HomePanel title="场地展示" sub-title="场地展示 副标题" category="space">
        <template #main>
            <ul class="goods-list">
                <li v-for="item in limitSpaceList" :key="item.id">
                    <RouterLink :to="`/space/${item.id}`" class="goods-item">
                        <img :src="item.img[0]" alt="" />
                        <p class="name">{{ item.spaceName }}</p>
                        <p class="price">{{ item.price }}</p>
                    </RouterLink>
                </li>
            </ul>
        </template>
    </HomePanel>
</template>


<style scoped lang='scss'>
.goods-list {
    display: flex;
    justify-content: space-between;
    height: 406px;

    li {
        width: 306px;
        height: 406px;

        background: #f0f9f4;
        transition: all .5s;

        &:hover {
            transform: translate3d(0, -3px, 0);
            box-shadow: 0 3px 8px rgb(0 0 0 / 20%);
        }

        img {
            width: 306px;
            height: 306px;
        }

        p {
            font-size: 22px;
            padding-top: 12px;
            text-align: center;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
        }

        .price {
            color: #cf4444;
        }
    }
}
</style>