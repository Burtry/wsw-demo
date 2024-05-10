<script setup>
import HomePanel from '../HomePanel.vue'
import { ref } from 'vue'


const spaceList = ref([
    {
        id: '1',
        name: '器材1',
        picture: 'https://yanxuan-item.nosdn.127.net/e54f83bde30509f3440fa05c31d080aa.png?type=webp&imageView&quality=95&thumbnail=330x330'
    },
    {
        id: '2',
        name: '器材2',
        picture: 'https://yanxuan-item.nosdn.127.net/e54f83bde30509f3440fa05c31d080aa.png?type=webp&imageView&quality=95&thumbnail=330x330'
    },
    {
        id: '3',
        name: '器材3',
        picture: 'https://yanxuan-item.nosdn.127.net/e54f83bde30509f3440fa05c31d080aa.png?type=webp&imageView&quality=95&thumbnail=330x330'
    },
    {
        id: '4',
        name: '器材4',
        picture: 'https://yanxuan-item.nosdn.127.net/e54f83bde30509f3440fa05c31d080aa.png?type=webp&imageView&quality=95&thumbnail=330x330'
    },
    {
        id: '4',
        name: '器材4',
        picture: 'https://yanxuan-item.nosdn.127.net/e54f83bde30509f3440fa05c31d080aa.png?type=webp&imageView&quality=95&thumbnail=330x330'
    }
])




</script>

<template>
    <HomePanel title="器材展示" sub-title="器材展示 副标题" category="equipment">
        <template #main>
            <ul class="goods-list">
                <li v-for="item in spaceList" :key="item.id">
                    <RouterLink :to="`/equipment/${item.id}`">
                        <img src="@/assets/images/404.png" :alt="item.name" />
                        <p class="name">{{ item.name }}</p>
                        <!-- TODO -->

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