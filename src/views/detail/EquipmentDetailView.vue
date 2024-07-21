<script setup>
import { ref } from 'vue'
import { getEquipmentByIdAPI } from "@/api/equipment.js";
import { useRoute } from "vue-router"

const route = useRoute();
const equipmentId = route.params.id;
const equipment = ref({});
getEquipmentByIdAPI(equipmentId).then((res) => {

    const data = res.data;
    // 处理 img 字符串，将其转为数组
    if (data.img) {
        data.img = data.img.slice(1, -1).split(',').map(url => url.trim());
    }
    equipment.value = {
        ...data,
        rentalPrice: data.rentalPrice + "元/天"
    };
}).catch(error => {
    console.error('获取器材数据时出错:', error);
});
</script>

<template>
    <div class="detail">
        <div class="container">
            <div class="info-container">
                <div>
                    <div class="info">
                        <div class="media">
                            <!-- 图片预览区 -->
                            <el-carousel arrow="always" height="400px">
                                <el-carousel-item v-for="item in equipment.img" :key="item.id">
                                    <img :src="item" alt="" class="s-img">
                                </el-carousel-item>
                            </el-carousel>
                        </div>
                        <div class="detail">
                            <p class="name">器材名: {{ equipment.equipmentName }} </p>
                            <p class="desc">详细描述: {{ equipment.description }} </p>
                            <p class="type">
                                器材类型: {{ equipment.equipmentType }}
                            </p>
                            <div class="price">
                                租借价格: <span>{{ equipment.rentalPrice }}</span>
                            </div>
                            <!-- 按钮组件 -->
                            <div>
                                <el-button size="large" class="detail-btn">
                                    立即预约
                                </el-button>
                                <el-button size="large" class="detail-btn">
                                    收藏
                                </el-button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<style scoped lang='scss'>
.detail {
    .info {
        min-height: 620px;
        background: #fff;
        display: flex;

        .media {
            width: 560px;
            height: 600px;
            padding: 30px 50px;
        }

    }
}

.detail {
    flex: 1;
    padding: 30px 30px 30px 0;

    .name {
        font-size: 22px;
        padding-bottom: 10px;
        margin-top: 10px;
    }

    .desc {
        font-size: 20px;
        color: #999;
        line-height: 30px;
        padding-bottom: 10px;
        border-bottom: #999 solid 1px;
    }

    .type {
        font-size: 20px;
        line-height: 30px;
        padding-bottom: 10px;
        margin-top: 20px;
    }


    .price {
        font-size: 20px;
        line-height: 30px;


        span {
            font-size: 24px;
            color: #f40;
        }
    }
}


.s-img {
    width: 100%;
    height: 400px;
}



.detail-btn {
    margin-top: 20px;
}
</style>